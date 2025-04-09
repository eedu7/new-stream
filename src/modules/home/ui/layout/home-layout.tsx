import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeNavbar } from "@/modules/home/ui/components/home-navbar";

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <div className="bg-blue-500">
                <HomeNavbar />
            </div>
            {children}
        </SidebarProvider>
    );
};
