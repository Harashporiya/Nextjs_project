
import { db } from "@/lib/db/db";
import { inventories, products, wareHouses } from "@/lib/db/schema";
import { inventoriesSchema } from "@/lib/validators/inventriesSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request:Request) {

    const requestData = await request.json();

    let validedData ;

    try {
        validedData = await inventoriesSchema.parse(requestData)
    } catch (error) {
        return Response.json({message:error},{status:400})
    }

    try {
        await db.insert(inventories).values(validedData)
        return Response.json({message:"OK"},{status:201})
    } catch (error) {
        return Response.json({message:"Failed to store the invertory into the dataBase"},{status:500})
    }
    
}

export async function GET(){
    try {
        const allInventories = await db.select(
            {
                id:inventories.id,
                sku:inventories.sku,
                wareHouses:wareHouses.name,
                products:products.name
            }
        ).from(inventories)
        .leftJoin(wareHouses,eq(inventories.warehouseId,wareHouses.id))
        .leftJoin(products,eq(inventories.productId,products.id))
        .orderBy(desc(inventories.id))
        return Response.json(allInventories)
    } catch (error) {
        return Response.json({message:"Failed to fetch inventories"},{status:500})
    }
}