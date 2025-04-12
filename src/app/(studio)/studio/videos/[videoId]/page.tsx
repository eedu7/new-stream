import React from "react";
import { HydrateClient, trpc } from "@/trpc/server";
import { VideoView } from "@/modules/studio/ui/views/video-view";

interface VideoIdPageProps {
    params: Promise<{ videoId: string }>;
}

async function VideoIdPage({ params }: VideoIdPageProps) {
    const { videoId } = await params;

    void trpc.studio.getOne.prefetch({ id: videoId });

    return (
        <HydrateClient>
            <VideoView videoId={videoId} />
        </HydrateClient>
    );
}

export default VideoIdPage;
