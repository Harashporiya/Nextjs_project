import React from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
const About = () => {
  return (
    <div className='bg-[#ffbb7343] p-10 mt-2'>
     <div className='flex md:flex-row flex-col  items-center md:items-center justify-center space-x-10'>
        <div>
            <Image src='chocolate.jpg' alt='' className='h-48 w-96 rounded-sm'/>
        </div>
     <div className='m-2 max-w-[500px]'>
        <p className='text-xl md:text-2xl font-bold text-red-950'>Forget love, I&quotd Rather Fall In Chocolate</p>
        <p className='text-sm md:text-lg mt-2 text-red-900 min-w-screen' >Increases heart health: The antioxidants in dark chocolate have been shown to lower blood pressure, reduce the risk of clotting and increases</p>
        <Button  className="mt-8 text-white font-bold w-fit  bg-red-950 hover:bg-red-900">Shop Now</Button>
      </div>
     
     </div>
    </div>
  )
}

export default About
