"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ResponsiveModal } from "@/components/responsive-modal";
import { StudioUploader } from "@/modules/studio/ui/components/studio-uploader";

export const StudioUploadModal = () => {
    const utils = trpc.useUtils();
    const create = trpc.videos.create.useMutation({
        onSuccess: () => {
            toast.success("Video created");
            utils.studio.getMany.invalidate();
        },
        onError: (error) => {
            toast.error(`Something went wrong! ${error.message}`);
        },
    });

    return (
        <>
            <ResponsiveModal
                title="Upload a video"
                open={!!create.data?.url}
                onOpenChange={() => create.reset()}
            >
                <p>This will be an uploader</p>
                {create.data?.url ? (
                    <StudioUploader
                        endpoint={create?.data?.url}
                        onSuccess={() => {}}
                    />
                ) : (
                    <Loader2Icon />
                )}
            </ResponsiveModal>
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
        </>
    );
};
