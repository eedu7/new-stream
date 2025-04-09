"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export const AuthButton = () => {
    // TODO: Add different auth states
    return (
        <>
            <SignedIn>
                <UserButton />
                {/* TODO: Add menu items for Studio and user profile */}
            </SignedIn>
            <SignedOut>
                <SignInButton mode="modal">
                    <Button
                        variant="outline"
                        className="cursor-pointer rounded-full border-blue-500/20 px-4 py-2 text-sm font-medium text-blue-600 shadow-none hover:text-blue-500"
                    >
                        <UserCircleIcon />
                        Sign in
                    </Button>
                </SignInButton>
            </SignedOut>
        </>
    );
};
