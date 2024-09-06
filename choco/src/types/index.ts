export interface Product{
    id:number;
    name:string;
    image:string;
    price:number;
}
export interface SingleProduct{
    id:number;
    name:string;
    image:string;
    price:number;
    description:string
}
export interface Warehouse{
    id:number;
    name:string;
    pincode:string;
}
export interface deliveryperson{
    id:number;
    name:string;
    phone:string;
    warehouseId:number;
}
export interface Inventory{
    id:number;
    sku:string;
    wareHouses:string;
    products:string;
}

export interface InventoryData{
    sku:string;
    warehouseId:number;
    productId:number;
}

