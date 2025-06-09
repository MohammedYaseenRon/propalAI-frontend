"use client";

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-lg border-b border-gray-800 border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className='flex justify-between items-center h-16'>
                    <div>
                        <h1 className='text-xl text-white'>Propal | AI</h1>
                    </div>
                    <div className='hidden md:block'>
                        <div className='cursor-pointer flex items-center gap-2'>
                            <h2 className="text-white hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-md font-medium">Features</h2>
                            <h2 className="text-white hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-md font-medium">About Us</h2>
                            <h2 className="text-white hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-md font-medium">Contact</h2>
                        </div>
                    </div>
                    <div className='flex items-center space-x-4 hidden md:block'>
                        <button className='text-white cursor-pointer text-md px-3 py-2 bg-black rounded-xl hover:bg-gray-900 hover:opacity-100 transition-opacity'>
                            Login
                        </button>
                        <Link href='/signup'><button className='text-white cursor-pointer text-md px-3 py-2 bg-black rounded-xl hover:bg-gray-900 border'>
                            Signup
                        </button></Link>
                    </div>
                    <div className='md:hidden'>
                        <button className='text-gray-400' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className='md:hidden'>
                    <div className='cursor-pointer flex items-center gap-2'>
                        <h2 className="text-white hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-md font-medium">Features</h2>
                        <h2 className="text-white hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-md font-medium">About Us</h2>
                        <h2 className="text-white hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-md font-medium">Contact</h2>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <button className='text-white cursor-pointer text-md px-3 py-2 bg-black rounded-xl hover:bg-gray-900 hover:opacity-100 transition-opacity'>
                            Login
                        </button>
                        <button className='text-white cursor-pointer text-md px-3 py-2 bg-black rounded-xl hover:bg-gray-900 border'>
                            Signup
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar