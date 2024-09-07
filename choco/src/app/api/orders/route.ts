import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/lib/db/db";
import { deliveryPerson, inventories, orders, products, wareHouses } from "@/lib/db/schema";
import { orderSchema } from "@/lib/validators/orderSchema";
import { eq, isNull,and, inArray } from "drizzle-orm";
import { getServerSession } from "next-auth";


export async function POST(request:Request){
    // get session
    const session = await getServerSession(authOptions);
    const requestData = await  request.json()

    if(!session){
        return Response.json({message:"Not allowed"}, {status:401  })
    }

    // validation
    let validedData ;

    try {
        validedData = await orderSchema.parse(requestData)
    } catch (error) {
        return Response.json({message:error},{status:400})
    }

    // Order creation.

    const warehouseResult = await db.select({id:wareHouses.id})
    .from(wareHouses).where(eq(wareHouses.pincode, validedData.pincode))


    if(!warehouseResult.length){
        return Response.json({message:"No warehouse found"},{status:400})
    }
    
    const foundProduct = await db.select().from(products).where(eq(products.id,validedData.productId)).limit(1);

    if(!foundProduct.length){
        return Response.json({message:"No product found"},{status:400})
    }

    let transactionError:string = "";
    let finalOrder:any = null;

    try {
        finalOrder = await db.transaction(async (tx)=>{
            // create order
            const order = await tx.insert(orders)
            // @ts-ignore
            .values({...validedData,userId:session.token.id,
                price:foundProduct[0].price * validedData.qty, 
                // todo: ove all statuses to enum and const
                status:'received'}).returning({id:orders.id,price:orders.price});

           
         // check stock
         const availableStock = await tx.select().from(inventories)
         .where(
            and(
                eq(inventories.warehouseId, warehouseResult[0].id),
               eq(inventories.productId,validedData.productId),
                  isNull(inventories.orderId)
                )
            ).limit(validedData.qty).for('update',{skipLocked:true})      // for update database lock  
           
            if(availableStock.length < validedData.qty){
                transactionError = `Stock is low only ${availableStock.length} product available`;
                 tx.rollback()
                 return;
            }

            // chech delivery person availibility
            const availablePerson = await tx.select().from(deliveryPerson)
            .where(and(
                isNull(deliveryPerson.orderId),
                eq(deliveryPerson.warehouseId, warehouseResult[0].id)
            )).for('update').limit(1)

             if(!availablePerson.length){
                transactionError = `Delivery person is not available at the moment`;
                tx.rollback()
                return;
             }    

             // stock is available and delivery person is available
             // update inventories table and add order_id

             await tx.update(inventories).set({orderId:order[0].id})
             .where(
                inArray(inventories.id, availableStock.map((stock)=>stock.id))
             )

             // update delivery person
             await tx.update(deliveryPerson).set({orderId:order[0].id})
             .where(eq(
                deliveryPerson.id,availablePerson[0].id
             ))

             // update order
             await tx.update(orders).set({status:'reserved'})
             .where(eq(orders.id, order[0].id));

         return order[0]

        })
    } catch (error) {
        // log
        // in production -> be careful don't return error to the client 
        return Response.json({message:transactionError? transactionError:"Error while db transaction"},{status:500})
    }

    

}