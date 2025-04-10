"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const StudioUploadModal = () => {
    // TODO: Add upload functionality
    return (
        <Button
            variant="secondary"
            className="cursor-pointer"
        >
            <PlusIcon />
            Create
        </Button>
    );
};
