"use client";

import React from "react";
import { HistoryIcon, ListVideoIcon, LucideIcon, ThumbsUpIcon } from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items: { title: string; href: string; icon: LucideIcon; auth?: boolean }[] = [
    {
        title: "History",
        href: "/playlists/history",
        icon: HistoryIcon,
        auth: true,
    },
    {
        title: "Liked videos",
        href: "/playlists/liked",
        icon: ThumbsUpIcon,
        auth: true,
    },
    {
        title: "All playlists",
        href: "/playlists",
        icon: ListVideoIcon,
        auth: true,
    },
];

export const PersonalSection = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>You</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map(({ title, href, icon: Icon }) => (
                        <SidebarMenuItem key={title}>
                            <SidebarMenuButton
                                tooltip={title}
                                asChild
                                isActive={false} // TODO: Change to look at current pathName
                                onClick={() => {}} // TODO: Do something on click
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
