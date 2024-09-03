import { db } from "@/lib/db/db";
import { deliveryPerson } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/deliveryPersonSchema";

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