"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { SidebarHeader } from "@/components/ui/sidebar";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";

export const StudioSidebarHeader = () => {
    const { user } = useUser();

    if (!user) return null;

    return (
        <SidebarHeader className="flex items-center justify-center pb-4">
            <Link href={"/users/current"}>
                <UserAvatar
                    imageUrl={user?.imageUrl}
                    name={user?.fullName ?? "User"}
                    className="size-[112px] transition-opacity hover:opacity-80"
                />
            </Link>
            <div className="mt-2 flex flex-col items-center">
                <p className="text-sm font-medium">Your profile</p>
                <p className="text-muted-foreground text-xs">{user?.fullName}</p>
            </div>
        </SidebarHeader>
    );
};
