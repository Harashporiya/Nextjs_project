import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

export default function ImageHome() {
    return (
        <section className="relative w-full h-screen">
          
            <div className="relative z-50 flex flex-col justify-center  h-full px-5 mx-auto text-white md:px-10 xl:px-28 3xl:px-5">
                <h1 className="text-3xl sm:text-8xl font-bold ">
                    10 Minute Delivery <br /> At Your Door
                </h1>
                <p className="mt-8 max-w-[600px] text-xl md:text-xl ">
                    Why wait? Our 10-minute delivery service brings your favorite chocolates right
                    to your door, swiftly and reliably. Convenience and indulgence, all in one
                    package.
                </p>
                <Button variant="secondary" className="mt-8 w-fit px-8">
                    Shop Now
                </Button>
            </div>

         
            <Image
                src="/chocolate.jpg"
                alt=""
                fill
                className="object-cover  object-center"
                priority
                
            />

            <div className="absolute inset-0 bg-black/70" />
        </section>
    );
}
