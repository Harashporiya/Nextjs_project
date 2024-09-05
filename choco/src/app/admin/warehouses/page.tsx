"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import {DataTable} from '../_components/data-table'
import { columns } from './_components/columns'
import { useQuery } from '@tanstack/react-query'
import {  getAllWarehouses } from '@/http/api'
import {  Warehouse } from '@/types'
import { useNewWarehouses } from '@/store/warehouse/warehouse-store'
import { Loader2 } from 'lucide-react'
import WarehouseSheet from './_components/warehouses-sheet'

const WarehousesPage = () => {
    const {onOpen} = useNewWarehouses()
    const {data:warehouse,isLoading,isError} = useQuery<Warehouse[]>({
        queryKey:['warehouse'],
        queryFn:getAllWarehouses,
    })

  return (<>
  <div>
    <div className='flex items-center justify-between'>
     <h3 className='text-2xl font-bold tracking-tight'>Warehouses</h3>
     <Button size={'sm'}  onClick={onOpen}>Add Warehouse</Button>
    
    </div>
   <WarehouseSheet/>
    </div>
    {
      isError && <span className='text-red-500'>Something went wrong.</span>
    }

    {
      isLoading ? ( <div className='flex items-center justify-center'>
        <Loader2 className='size-10 animate-spin'/>
      </div>
    ): <DataTable columns={columns}  data={warehouse || []}/>
    }
    
    
   
    </>
  )
}

export default WarehousesPage
