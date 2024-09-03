import { db } from "@/lib/db/db";
import { deliveryPerson, wareHouses } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/deliveryPersonSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request:Request){
    const requestData = await request.json()
    let vaildatedData;
    try {
        vaildatedData = await deliveryPersonSchema.parse(requestData)
       
    } catch (error) {
        return Response.json({message:error},{status:400});
    }

    try {
        await db.insert(deliveryPerson).values(vaildatedData)
        return Response.json({message:"OK"},{status:200})
    } catch (error) {
        return Response.json({error,message:"Failed to store the delivery person into the dataBase"},{status:500})
    }
}

export async function GET(){
    try {
        const alldeliverPerson = await db.select({
          id:deliveryPerson.id,
          name:deliveryPerson.name,
          phone:deliveryPerson.phone,
          wareHouses:wareHouses.name,
        })
        .from(deliveryPerson)
        .leftJoin(wareHouses,eq(deliveryPerson.warehouseId, wareHouses.id))
        .orderBy(desc(deliveryPerson.id))
        return Response.json(alldeliverPerson)
    } catch (error) {
        return Response.json({message:"Failed to fetch delivery person"},{status:500})
    }
}