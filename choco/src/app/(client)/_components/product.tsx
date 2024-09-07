'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/http/api';
import { Product } from '@/types';
import { Skeleton } from "@/components/ui/skeleton"



const Products = () => {

  const { data: products,isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    staleTime: 10 * 1000,
    
  });
 
  const skeletons =  Array.from({ length: products?.length || 6 });


  return (
    <section className="bg-[#f5f5f5] px-5 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-center gap-5">
        <hr className="md:w-48 w-24 h-1  my-4 bg-red-900 border-0 rounded" />
          <p className="text-3xl font-bold text-red-900">Products</p>
          <hr className="md:w-48 w-24 h-1  my-4 bg-red-900 border-0 rounded" />
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {
            isLoading?
            <>

          {
            skeletons.map((_,i)=>(
              <div key={i} className='flex h-full w-full flex-col gap-5'>
                 <Skeleton className='aspect-square w-full bg-[#854c2b9f] rounded-md '/>
                 <Skeleton className='h-5 w-full rounded-md bg-[#854c2b9f]'/>
                 <Skeleton className='h-5 w-10 rounded-md bg-[#854c2b9f]'/>
                 <Skeleton className='h-8 w-full rounded-md bg-[#854c2b9f]'/>
              </div>
            ))
          }
          </>:<>
          {products?.map((item: Product) => {
            return (
              <div
                key={item.id}
                className="flex flex-col items-start justify-center gap-5">
                <Image
                  src={`/assets/${item.image}`}
                  alt={item.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%' }}
                  className="aspect-square rounded-t-md object-cover shadow-lg hover:cursor-pointer"
                />

                <div className="w-full">
                  <p className="text-lg font-semibold text-[#78350f]">
                    {item.name}
                  </p>
                  <div className="mt-1 space-x-2">
                    <span className="font-bold text-[#78350f]">${item.price}</span>
                  </div>

                  <Link href={`/product/${item.id}`}>
                    <Button
                      size={'sm'}
                      className="mt-5 w-full bg-[#4e2107] hover:bg-[#6c3110]">
                      Buy Now
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
          </>}
          

          
        </div>
      </div>
    </section>
  );
};

export default Products;