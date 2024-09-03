import React from 'react'
import Link from "next/link"
import {
  Bell,
  BlocksIcon,
  HomeIcon,
  LayersIcon,
  Package2,
  ShoppingCart,
  Users,
  WarehouseIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const  Sidebar=()=> {
    const navItem=[
        {label:"Deshboard",href:"/admin",Icon:HomeIcon},
        {label:"Products",href:"/admin/products",Icon:LayersIcon},
        {label:"Warehouses",href:"/admin/warehouses",Icon:WarehouseIcon},
        {label:"Delivery Persons",href:"/admin/delivery-persons",Icon:Users},
        {label:"Orders",href:"/admin/orders",Icon:ShoppingCart},
        {label:"Inventories",href:"/admin/inventories",Icon:BlocksIcon}
    ]
  return (
    <div>
       <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Choco Inc</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {
                navItem.map((item)=>{
                    return(
                        <Link
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                      >
                        <item.Icon className='h-4 w-4'/>
                       {item.label}
                      </Link>
                    )
                })
            }
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
