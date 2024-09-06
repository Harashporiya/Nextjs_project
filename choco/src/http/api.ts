
import { deliveryperson, InventoryData } from "@/types";
import { api } from "./client"

export const getAllProducts = async()=>{
    const response = await api.get("/products");
    return response.data
}

export const createProduct = async(data:FormData)=>{
    const response = await api.post("/products", data,{
    headers:{
        'Content-Type':"multipart/form-data"

    },
      })

      return response.data
}

export const getAllWarehouses = async()=>{
   const response = await api.get("/warehouses");
   return response.data
}

export const createWarehouses = async (data:FormData)=>{
    const response = await api.post("/warehouses",data,{
        headers:{
            'Content-Type':"application/json"
        }
    })

    return response.data
}

export const getAllDeliveryPerson = async()=>{
    const response = await api.get("/delivery-person")

    return response.data
}

export const createDeliveryPerson = async (data:deliveryperson)=>{
    const response = await api.post("/delivery-person",data)

    return response.data
}

export const getAllInventory = async()=>{
    const response = await api.get("/inventories")

    return response.data
}

export const createInventory = async (data:InventoryData)=>{
    const response = await api.post("/inventories",data)

    return response.data
}

export const getSingleProduct = async(id:string)=>{
    const response = await api.get(`/products/${id}`)

    return response.data
}

