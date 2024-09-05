import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import CreateWarehouseForm,{FormValues} from './create-warehouses-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createWarehouses } from '@/http/api'

import { useNewWarehouses } from '@/store/warehouse/warehouse-store'
import { useToast } from '@/hooks/use-toast'

const WarehouseSheet = () => {
    const {isOpen, onClose}  = useNewWarehouses()
    const queryClient = useQueryClient();
    const {toast} = useToast();

    const {mutate, isPending} = useMutation({
        mutationKey:['create-warehouse'],
        mutationFn:(data:FormData )=>createWarehouses(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['warehouse']});
            toast({
                title: 'Warehouse created successfully',
            })
            onClose();
        }
    })

    const onSubmit=(values:FormValues)=>{
          console.log("values",values)
          const formData = new FormData()
          formData.append("name",values.name)
          formData.append("pincode",values.pincode)
        
          
          mutate(formData)
    }
    return (
        <div>
            <Sheet open={isOpen} onOpenChange={onClose}>
                {/* <SheetTrigger>Open</SheetTrigger> */}
                <SheetContent className='min-w-[28rem] space-y-4'>
                    <SheetHeader>
                        <SheetTitle>Create warehouse</SheetTitle>
                        <SheetDescription>
                           Create a new warehouse
                        </SheetDescription>
                    </SheetHeader>
                   <CreateWarehouseForm disabled={isPending} onSubmit={onSubmit}/>
                </SheetContent>
            </Sheet>

        </div>
    )
}

export default WarehouseSheet
