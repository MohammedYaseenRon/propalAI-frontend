'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Login {
    email: string;
    password: string
}

const LoginPage = () => {
    const [formData, setFormData] = useState<Login>({
        email: "",
        password: "",
    });
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const response = await axios.post("/api/login", formData);
            if(response.status == 200) {
                toast.success('Login successfull');
                localStorage.setItem("user", JSON.stringify(response.data.user));
                router.push("/dashboard");
            }
        }catch(error) {
            console.log("Error while logging in", error);
            toast.error("Login error");
        }
    }

    return (
        <div className='bg-black min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden py-12'>
            <div className='max-w-md w-full space-y-8 relative z-10'>
                <div className='inline-flex items-center gap-3'>
                    <Link href="/"><ArrowLeft className='h-5 w-5 text-blue-600' /></Link>
                    <h2 className='text-md font-medium text-blue-600'>Back to Home</h2>
                </div>
                <Card className="bg-[#222222]">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center text-white">Welcome Back</CardTitle>
                        <CardDescription className="text-center text-gray-400">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className='text-white text-md'>Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-gray-20 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className='text-white text-md'>Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-gray-20 text-white"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-gray-200 cursor-pointer"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Siging in...' : 'Sign in'}
                            </Button>
                        </form>

                        <div className="text-center">
                            <span className="text-muted-foreground">Don&apos;t have an account? </span>
                            <Link href="/signup" className="text-white hover:text-blue-600 transition-colors font-medium">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default LoginPage