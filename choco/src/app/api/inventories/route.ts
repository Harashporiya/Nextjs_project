
import { db } from "@/lib/db/db";
import { inventories } from "@/lib/db/schema";
import { inventoriesSchema } from "@/lib/validators/inventriesSchema";

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