"use client"
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

const Header = () => {
    const [activeLink, setActiveLink] = useState('/');
    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Best Selling', href: '/best-selling' },
        { label: 'Offers', href: '/offers' },
        { label: 'Orders', href: '/account/orders' },
    ];

    const handleClick = (href: string) => {
        setActiveLink(href);
    };

    return (
        <header>
            <div className='flex justify-center bg-[#4d1b00] p-2'>
                <p className='text-white'>Order 2 Delight Dairy Choco bars today and save 100&#8377; instantly!</p>
            </div>
            <nav className='flex justify-center space-x-10 bg-[#ffffff] p-4'>
                {navItems.map((item) => (
                    <div key={item.label}>
                        <a
                            href={item.href}
                            onClick={() => handleClick(item.href)}
                            className={cn(
                                'text-[#4d1b00] underline-offset-4',
                                activeLink === item.href
                                    ? 'font-bold underline'
                                    : 'hover:text-[#4d1b00] hover:font-bold hover:underline'
                            )}
                        >
                            {item.label}
                        </a>
                    </div>
                ))}
            </nav>
        </header>
    );
};

export default Header;
