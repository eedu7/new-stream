"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

export const StudioUploadModal = () => {
    const utils = trpc.useUtils();
    const create = trpc.videos.create.useMutation({
        onSuccess: () => {
            toast.success("Video created");
            utils.studio.getMany.invalidate();
        },
        onError: () => {
            toast.error("Something went wrong!");
        },
    });

    return (
        <Button
            variant="secondary"
            className="cursor-pointer"
            onClick={() => create.mutate()}
            disabled={create.isPending}
        >
            {create.isPending ? (
                <Loader2Icon className="animate-spin" />
            ) : (
                <>
                    <PlusIcon />
                </>
            )}
            Create
        </Button>
    );
};
