"use client"
import { getSingleProduct } from '@/http/api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'
import Header from '../../_components/header'
import Image from 'next/image'
import { Star } from 'lucide-react'
import type { SingleProduct } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { orderSchema } from '@/lib/validators/orderSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'


const SingleProduct = () => {
  const params = useParams()
  const id = params.id

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      address: "",
      pincode: "",
      qty: 1,
      productId: Number(id)
    }
  })

  const { data: product, isLoading } = useQuery<SingleProduct>({
    queryKey: ['product', id],
    queryFn: () => getSingleProduct(id as string)
  })

  const onSubmit = (values: z.infer<typeof orderSchema>) => {
    // Handle form submission
    console.log({values})
  }

  return (
    <div>
      <Header />
      <section className='min-h-screen relative bg-[#f5f5f5]'>
        <div className='z-50 mx-auto flex h-full max-w-6xl gap-x-10 px-5 py-14 md:py-20'>
          <div>
            {isLoading ? (
              <Skeleton className='aspect-square w-[28rem] bg-[#854c2b9f]' />
            ) : (
              product && (
                <Image
                  src={`/assets/${product.image}`}
                  alt={product.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="aspect-square w-[28rem] rounded-md object-cover shadow-2xl"
                />
              )
            )}
          </div>
          <div className='space-y-1'>
            {isLoading ? (
              <div className='space-y-4'>
                <Skeleton className='h-5 w-20 bg-[#854c2b9f]' />
                <Skeleton className='h-10 w-80 bg-[#854c2b9f]' />
                <div className='flex items-center gap-x-3'>
                  <div className='flex items-center gap-x-0.5'>
                    <Star className='size-4 text-yellow-400' fill="#facc15" />
                    <Star className='size-4 text-yellow-400' fill="#facc15" />
                    <Star className='size-4 text-yellow-400' fill="#facc15" />
                    <Star className='size-4 text-yellow-400' fill="#facc15" />
                    <Star className='size-4 text-yellow-400' />
                  </div>
                  <span className='text-sm'>144 Review</span>
                </div>
                <Skeleton className='h-32 w-[500px] bg-[#854c2b9f]' />
                <hr className="md:w-full w-24 h-0 my-4 bg-gray-900 rounded" />
              <div className='flex justify-between'>
              <Skeleton className='h-10 w-20 bg-[#854c2b9f]' />
              <Skeleton className='h-10 w-20 bg-[#854c2b9f]' />
              </div>
              </div>
            ) : (
              product && (
                <>
                  <h2 className='text-sm text-[#b45309]'>BRAND NAME</h2>
                  <h2 className='text-2xl font-semibold text-[#5f2506]'>{product.name}</h2>
                  <div className='flex items-center gap-x-3'>
                    <div className='flex items-center gap-x-0.5'>
                      <Star className='size-4 text-yellow-400' fill="#facc15" />
                      <Star className='size-4 text-yellow-400' fill="#facc15" />
                      <Star className='size-4 text-yellow-400' fill="#facc15" />
                      <Star className='size-4 text-yellow-400' fill="#facc15" />
                      <Star className='size-4 text-yellow-400' />
                    </div>
                    <span className='text-sm'>144 Review</span>
                  </div>
                  <p>{product.description}</p>

                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex space-x-2 mt-2'>
                      <FormField
                        control={form.control}
                        name='address'
                        render={({ field }) => (
                          <FormItem className='w-3/6'>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea    className="h-9 border-[#b45309] bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b45309] focus-visible:ring-offset-0"
                                                                
                               placeholder='e.g. Open Street, 55' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='pincode'
                        render={({ field }) => (
                          <FormItem className='w-3/6'>
                            <FormLabel>Pincode</FormLabel>
                            <FormControl>
                             <input type='number' placeholder='e.g. 546723' {...field}     className="h-9 p-2 rounded-sm border-[1px] border-[#b45309] bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b45309] focus-visible:ring-offset-0"
                                                                
                                                                 />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='qty'
                        render={({ field }) => (
                          <FormItem className='w-3/6'>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                             <input type='number' placeholder='1 any' {...field}     className="h-9 p-2 rounded-sm border-[1px] border-[#b45309] bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b45309] focus-visible:ring-offset-0"
                                                                
                                                                 />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <hr className="md:w-full w-24 h-[2px] my-4 bg-black rounded" />
                    <div className='flex items-center justify-between'>
                      <span className='text-3xl font-semibold'>$50</span>
                      <Button type='submit'>Buy Now</Button>

                    </div>
                  </form>
                </Form>
                </>
              )
            )}
          </div> 
        </div>
      </section>
    </div>
  )
}

export default SingleProduct
