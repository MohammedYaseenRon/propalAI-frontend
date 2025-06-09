import React from 'react'
import { Code, Zap, Shield, Globe } from 'lucide-react';


const features = [
    {
        icon: Code,
        title: 'Modern Development',
        description: 'Built with the latest technologies and best practices for optimal performance.'
    },
    {
        icon: Zap,
        title: 'Lightning Fast',
        description: 'Optimized for speed with instant loading and smooth user experiences.'
    },
    {
        icon: Shield,
        title: 'Secure & Reliable',
        description: 'Enterprise-grade security with 99.9% uptime guarantee.'
    },
    {
        icon: Globe,
        title: 'Global Scale',
        description: 'Deploy worldwide with our global CDN and edge computing infrastructure.'
    }
];

const Features = () => {
    return (
        <div className='px-4 py-12 sm:px-6 lg:px-8 bg-black'>
            <div className='max-w-7xl mx-auto space-y-6'>
                <div className='text-center mb-16'>
                    <h1 className='text-4xl text-white lg:text-5xl font-bold leading-tight'>Why Choose PropaL AI</h1>
                    <p className='text-xl font-medium text-[#787A91]'>Experience the next generation of technology with our powerful platform</p>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-8'>
                    {features.map((feature, index) => (
                        <div key={index} className='border border-gray-600 p-6 rounded-xl hover:bg-primary/5 transition-all duration-300 group animate-fade-in'>
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl text-white font-semibold mb-3">{feature.title}</h3>
                            <p className="text-md text-white">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Features