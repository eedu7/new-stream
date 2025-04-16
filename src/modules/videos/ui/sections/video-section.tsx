"use client";

import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { trpc } from "@/trpc/client";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "@/modules/videos/ui/components/video-player";
import { VideoBanner } from "@/modules/videos/ui/components/video-banner";

interface VideoSectionProps {
    videoId: string;
}

export const VideoSection = ({ videoId }: VideoSectionProps) => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <VideoSectionSuspense videoId={videoId} />
            </ErrorBoundary>
        </Suspense>
    );
};

const VideoSectionSuspense = ({ videoId }: VideoSectionProps) => {
    const [video] = trpc.videos.getOne.useSuspenseQuery({ id: videoId });

    return (
        <>
            <div
                className={cn(
                    "relative aspect-video overflow-hidden rounded-xl bg-black",
                    video.muxStatus !== "ready" && "rounded-b-none",
                )}
            >
                <VideoPlayer
                    autoPlay
                    onPlay={() => {}}
                    playbackId={video.muxPlaybackId}
                    thumbnailUrl={video.thumbnailUrl}
                />
            </div>
            <VideoBanner status={video.muxStatus} />
        </>
    );
};
