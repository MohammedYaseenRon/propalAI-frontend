import { ArrowRight, Sparkles } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const Hero = () => {
    return (
        <div className='min-h-screen pt-16 flex items-center justify-center relative overflow-hidden bg-black'>
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-700 rounded-full blur-3xl animate-float"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-700 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10'>
                <div>
                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 border border-gray-600 mb-8'>
                        <Sparkles className='text-blue-400' />
                        <h2 className='text-blue-400'>Welcome to the future</h2>
                    </div>
                    <h1 className='text-5xl md:text-6xl font-bold text-white leading-tight'>Enterprise-ready Voice
                        <br />
                        <span className='text-5xl md:text-6xl font-bold text-white'>AI Platform</span>
                    </h1>
                    <p className='text-2xl font-medium text-white max-w-3xl mx-auto leading-relaxed pt-2'>
                        Create stunning web applications with our cutting-edge platform.
                        Fast, reliable, and beautifully designed for modern developers.
                    </p>
                    <div className='flex flex-co sm:flex-row max-w-2xl mx-auto justify-center items-center pt-6 gap-6'>
                        <Button size="lg" className="bg-[#171717] text-white hover:opacity-90 transition-opacity px-8 py-4 text-lg">
                            Get Started Free
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-white hover:bg-white/100">
                            Sign In
                        </Button>
                    </div>
                </div>
                {/* Stats section */}
                <div className="mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">10k+</div>
                            <div className="text-muted-foreground">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                            <div className="text-muted-foreground">Uptime</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">24/7</div>
                            <div className="text-muted-foreground">Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero