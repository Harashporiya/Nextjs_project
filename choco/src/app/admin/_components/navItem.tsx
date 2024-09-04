import {
    BlocksIcon,
    HomeIcon,
    LayersIcon,
    ShoppingCart,
    Users,
    WarehouseIcon,
  } from "lucide-react"
export   const navItem=[
    {label:"Deshboard",href:"/admin",Icon:HomeIcon},
    {label:"Products",href:"/admin/products",Icon:LayersIcon},
    {label:"Warehouses",href:"/admin/warehouses",Icon:WarehouseIcon},
    {label:"Delivery Persons",href:"/admin/delivery-persons",Icon:Users},
    {label:"Orders",href:"/admin/orders",Icon:ShoppingCart},
    {label:"Inventories",href:"/admin/inventories",Icon:BlocksIcon}
]