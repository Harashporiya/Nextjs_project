import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import CreateProductForm, { FormValues } from './create-product-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '@/http/api'
import { useNewProduct } from '@/store/product/product-store'
import { useToast } from '@/hooks/use-toast'

const ProductSheet = () => {
    const {isOpen, onClose}  = useNewProduct()
    const queryClient = useQueryClient();
    const {toast} = useToast();

    const {mutate, isPending} = useMutation({
        mutationKey:['create-product'],
        mutationFn:(data:FormData )=>createProduct(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['products']});
            toast({
                title: 'Product created successfully',
            })
            onClose();
        }
    })

    const onSubmit=(values:FormValues)=>{
          console.log("values",values)
          const formData = new FormData()
          formData.append("name",values.name)
          formData.append("description",values.description)
          formData.append("price",String(values.price))
          formData.append("image",(values.image as FileList)[0])
          
          mutate(formData)
    }
    return (
        <div>
            <Sheet open={isOpen} onOpenChange={onClose}>
                {/* <SheetTrigger>Open</SheetTrigger> */}
                <SheetContent className='min-w-[28rem] space-y-4'>
                    <SheetHeader>
                        <SheetTitle>Create Product</SheetTitle>
                        <SheetDescription>
                           Create a new product
                        </SheetDescription>
                    </SheetHeader>
                   <CreateProductForm disabled={isPending} onSubmit={onSubmit}/>
                </SheetContent>
            </Sheet>

        </div>
    )
}

export default ProductSheet
