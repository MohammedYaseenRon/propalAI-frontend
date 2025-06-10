"use client";

import { AppSidebar } from '@/components/Sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { ReactNode } from 'react'
import { motion } from "framer-motion";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-secondary/20 to-accent/10">
                <AppSidebar />
                <motion.main
                    className="flex-1 p-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <SidebarTrigger />

                    {children}
                </motion.main>
            </div>
        </SidebarProvider>
    )
}

