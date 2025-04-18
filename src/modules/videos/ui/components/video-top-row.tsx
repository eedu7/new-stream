import React from "react";
import { VideoGetOneOutput } from "@/modules/videos/types";
import { VideoOwner } from "@/modules/videos/ui/components/video-owner";

interface VideoTopRowProps {
    video: VideoGetOneOutput;
}

export const VideoTopRow = ({ video }: VideoTopRowProps) => {
    return (
        <div className="mt-4 flex flex-col gap-4">
            <h1 className="text-xl font-semibold">{video.title}</h1>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <VideoOwner
                    user={video.user}
                    videoId={video.id}
                />
            </div>
        </div>
    );
};
