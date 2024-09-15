import Image from 'next/image';
import React from 'react'

const SpecialProduct = () => {
    const product = [
        { src: '/cabduryDairymilk.jpg', alt: 'Delicious chocolate', name: 'Cabdury dairy milk' },
        { src: '/marsbar.jpg', alt: 'Yummy chocolate', name: 'Mars bar' },
        { src: '/caramilk.jpg', alt: 'Sweet chocolate', name: 'Cabdury caramilk' },
        { src: '/darkChocolateBar.jpg', alt: 'Sweet chocolate', name: 'Dark chocolate bar' },
    ];

    return (
        <div className='mt-14'>
            <div className='flex justify-center md:justify-center space-x-4'>

                <hr className="md:w-48 w-24 h-1  my-4 bg-red-900 border-0 rounded" />

                <p className='md:text-3xl text-2xl font-bold text-red-900'>Special Product</p>
                <hr className="md:w-48 w-24 h-1  my-4 bg-red-900 border-0 rounded" />
            </div>

            <div className='flex md:flex-row text-center md:text-center flex-col items-center  md:justify-center md:space-x-10'>
                {product.map((item, index) => (
                    <div key={index} className='items-center space-x-8  md:mt-10 '>
                        <Image
                            src={item.src}
                            alt={item.alt} 
                            width={0}
                            height={0}
                            className="md:border-8 border-4 w-60 h-48  md:h-40 md:w-40 md:space-x-8 border-red-900 rounded-lg md:rounded-full"
                        />
                        <span className='text-lg text-center text-red-900 font-sans'>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SpecialProduct;