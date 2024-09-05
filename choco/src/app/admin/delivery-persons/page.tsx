"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import {DataTable} from './_components/data-table'
import { columns } from './_components/columns'
import { useQuery } from '@tanstack/react-query'
import {  getAllDeliveryPerson } from '@/http/api'
import {  deliveryperson } from '@/types'
import { useNewDeliveryPerson } from '@/store/deliveryperson/deliveryperson-store'
import { Loader2 } from 'lucide-react'
import DeliverySheet from './_components/delivery-sheet'


const WarehousesPage = () => {
    const {onOpen} = useNewDeliveryPerson()
    const {data:deliveryPerson,isLoading,isError} = useQuery<deliveryperson[]>({
        queryKey:['deliveryPerson'],
        queryFn:getAllDeliveryPerson,
    })

  return (<>
  <div>
    <div className='flex items-center justify-between'>
     <h3 className='text-2xl font-bold tracking-tight'>Delivery Persons</h3>
     <Button size={'sm'}  onClick={onOpen}>Add Delivery Person</Button>
    
    </div>
       <DeliverySheet/>
    </div>
    {
      isError && <span className='text-red-500'>Something went wrong.</span>
    }

    {
      isLoading ? ( <div className='flex items-center justify-center'>
        <Loader2 className='size-10 animate-spin'/>
      </div>
    ): <DataTable columns={columns}  data={deliveryPerson || []}/>
    }
    
    
   
    </>
  )
}

export default WarehousesPage
