"use client";
import { LayoutDashboard, LayoutList, Menu, User } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Profile",
    url: "/dashboard/profile", 
    icon: User,
  },
  {
    title: "Agent",
    url: "/dashboard/agent", 
    icon: User,
  },
  
  

];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-sidebar-border/50 backdrop-blur-sm">
      <SidebarHeader className="p-6 border-b border-sidebar-border/50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <Menu className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-sidebar-foreground">Dashboard</h2>
          </div>
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-medium mb-2">
            
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <SidebarMenuButton 
                        asChild 
                        className={`relative group transition-all duration-200 border ${
                          isActive 
                            ? 'bg-primary text-primary-foreground shadow-md' 
                            : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        }`}
                      >
                        <Link href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg">
                          <item.icon className={`w-4 h-4 transition-colors ${
                            isActive ? 'text-primary-foreground' : 'text-sidebar-foreground/70'
                          }`} />
                          <span className="font-medium">{item.title}</span>
                          {isActive && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute inset-0 rounded-lg border-2 border-primary/20"
                              initial={false}
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </motion.div>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border/50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/50"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-primary rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground">User</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">user@example.com</p>
          </div>
        </motion.div>
      </SidebarFooter>
    </Sidebar>
  );
}
