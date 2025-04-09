import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

export const HomeNavbar = () => {
    return (
        <nav className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center bg-white px-2 pr-5">
            <div className="flex w-full items-center gap-4">
                {/* Menu and Logo */}
                <div className="flex shrink-0 items-center">
                    <SidebarTrigger />
                    <Link href="/">
                        <div className="flex items-center gap-1 p-4">
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                width={32}
                                height={32}
                            />
                            <p className="text-xl font-semibold tracking-tight">NewSteam</p>
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
