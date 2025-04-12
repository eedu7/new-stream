"use client";

import React, { Suspense } from "react";
import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, TrashIcon } from "lucide-react";

interface FormSectionProps {
    videoId: string;
}

export const FormSection = ({ videoId }: FormSectionProps) => {
    return (
        <Suspense fallback={<FormSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <FormSectionSuspense videoId={videoId} />
            </ErrorBoundary>
        </Suspense>
    );
};

const FormSectionSkeleton = () => {
    return <p>Loading</p>;
};

export const FormSectionSuspense = ({ videoId }: FormSectionProps) => {
    const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });

    return (
        <div className="mb-6 flex w-full items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">Video details</h1>
                <p className="text-muted-foreground text-xs">Manage your video details</p>
            </div>
            <div className="flex items-center gap-x-2">
                <Button
                    disabled={false}
                    className="cursor-pointer"
                    type="submit"
                >
                    Save
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="cursor-pointer"
                            variant="ghost"
                            size="icon"
                        >
                            <MoreVerticalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex cursor-pointer items-center">
                            <TrashIcon className="mr-2 size-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
