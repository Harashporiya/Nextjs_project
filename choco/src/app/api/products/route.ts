import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productSchema";
import { desc } from "drizzle-orm";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST(request:Request){
    // todo:check user access 
    const data = await request.formData();
   
    let validatedData;

    try {
        validatedData=productSchema.parse({
            name:data.get('name'),
            description:data.get('description'),
            image:data.get('image'),
            price:Number(data.get('price'))
        })
    } catch (error) {
        return Response.json({message:error},{status:400})
    }
    const imageFile = validatedData.image instanceof FileList ? validatedData.image[0] : validatedData.image;



    const fileName = `${Date.now()}.${imageFile.name.split(".").slice(-1)}`    // choco.png  234123444.png
     
    try {
        // const buffer  = Buffer.from(await validatedData.image.arrayBuffer());
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        await writeFile(path.join(process.cwd(),"public/assets",fileName),buffer)
    } catch (error) {
        return Response.json({message:"Falied to save the file to fs"},{status:500});
    }
 
    try {
        await db.insert(products).values({...validatedData,image:fileName})
        // todo: remove stored image from fs
    } catch (error) {
        return Response.json({error,message:"Failed to store product into the database"},
            {status:500}
        )
    }

    return Response.json({meassge:"OK"},{status:201})
}

export async function GET(){
    try {
        const allProduct = await db.select().from(products).orderBy(desc(products.id));
        return Response.json(allProduct)
    } catch (error) {
        return Response.json({meassage:"Failed to fetch products"},{status:500})
    }
}