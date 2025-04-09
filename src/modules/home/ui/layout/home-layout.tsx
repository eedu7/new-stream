import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeNavbar } from "@/modules/home/ui/components/home-navbar";

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <div>
                <HomeNavbar />
            </div>
            <div className="flex min-h-screen pt-[4rem]">
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </SidebarProvider>
    );
};
