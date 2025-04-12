"use client";

import React, { Suspense } from "react";
import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";

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
        <div className="mb-6 flex w-full items-center justify-between border">
            <div>
                <h1 className="text-2xl font-bold">Video details</h1>
                <p className="text-muted-foreground text-xs">Manage your video details</p>
            </div>
            <div className="flex items-center gap-x-2">
                <Button
                    disabled={false}
                    type="submit"
                >
                    Save
                </Button>
            </div>
        </div>
    );
};
