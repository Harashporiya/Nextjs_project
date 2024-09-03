import { db } from "@/lib/db/db";
import { wareHouses } from "@/lib/db/schema";
import { wareHouseSchema } from "@/lib/validators/warehouseSchema";

export async function POST(request:Request){
    const requestData = await request.json()

    let validatedData;
    try {
        validatedData = await wareHouseSchema.parse(requestData);
    } catch (error) {
        return Response.json({message:error},{status:400})
    }

    try {
        await db.insert(wareHouses).values(validatedData)
        return Response.json({message:"OK"},{status:200})
    } catch (error) {
        return Response.json({message:"Failed to store the warehouses"},{status:500})
    }
}

export async function GET(){
    try {
        const allWarehouses = await db.select().from(wareHouses);
        return Response.json(allWarehouses)
    } catch (error) {
        return Response.json({message:"Failed to all warehouses not fetch"},{status:500})
    }
}