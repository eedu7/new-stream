import React from "react";
import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";

export const AuthButton = () => {
    // TODO: Add different auth states
    return (
        <Button
            variant="outline"
            className="cursor-pointer rounded-full border-blue-500/2 px-4 py-2 text-sm font-medium text-blue-600 shadow-none hover:text-blue-500/20"
        >
            <UserCircleIcon />
            Sign in
        </Button>
    );
};
