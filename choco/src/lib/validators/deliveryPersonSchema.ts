import {z} from "zod"
export const deliveryPersonSchema = z.object({
    name:z.string({message:"Delivery person name should be a string"}),
    phone:z.string({message:"Phone should be a string"}).length(13,"Delivery person phone shoul be 13 chars long"),
    warehouseId:z.number({message:"WarehouseId shole be a number"})
})