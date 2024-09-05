import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { wareHouseSchema } from '@/lib/validators/warehouseSchema'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
 
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'

export type FormValues = z.input<typeof wareHouseSchema>

const CreateWarehouseForm = ({onSubmit,disabled}:{onSubmit:(formValues:FormValues)=>void,disabled:boolean}) => {
    const form = useForm<z.infer<typeof wareHouseSchema>>({
        resolver:zodResolver(wareHouseSchema),
        
    })

   

    const handleSubmit =(values: FormValues)=>{ 
         onSubmit(values)
    }
  return (
    <div>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="add warehouse" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
       
    
         <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode</FormLabel>
              <FormControl>
              <Input placeholder='pincode...'  {...field} 
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
       <Button className='w-full' disabled={disabled}>
       { disabled ? <Loader2 className='size-4 animate-spin'/>:
              'Create'}
       </Button>
      </form>
    </Form>
    </div>
  )
}

export default CreateWarehouseForm
