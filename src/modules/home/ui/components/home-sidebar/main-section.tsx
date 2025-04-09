"use client";

import React from "react";
import { FlameIcon, HomeIcon, LucideIcon, PlaySquareIcon } from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useAuth, useClerk } from "@clerk/nextjs";

const items: { title: string; href: string; icon: LucideIcon; auth?: boolean }[] = [
    {
        title: "Home",
        href: "/",
        icon: HomeIcon,
    },
    {
        title: "Subscription",
        href: "/feed/subscription",
        icon: PlaySquareIcon,
        auth: true,
    },
    {
        title: "Trending",
        href: "/feed/trending",
        icon: FlameIcon,
    },
];

export const MainSection = () => {
    const { isSignedIn } = useAuth();
    const clerk = useClerk();

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map(({ title, href, icon: Icon, auth }) => (
                        <SidebarMenuItem key={title}>
                            <SidebarMenuButton
                                tooltip={title}
                                asChild
                                isActive={false} // TODO: Change to look at current pathName
                                onClick={(e) => {
                                    if (!isSignedIn && auth) {
                                        e.preventDefault();
                                        return clerk.openSignIn();
                                    }
                                }}
                            >
                                <Link
                                    href={href}
                                    className="flex items-center gap-4"
                                >
                                    <Icon />
                                    <span className="text-sm">{title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};
