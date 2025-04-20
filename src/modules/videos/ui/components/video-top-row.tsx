import React from "react";
import { VideoGetOneOutput } from "@/modules/videos/types";
import { VideoOwner } from "@/modules/videos/ui/components/video-owner";
import { VideoReactions } from "@/modules/videos/ui/components/video-reactions";
import { VideoMenu } from "@/modules/videos/ui/components/video-menu";
import { VideoDescription } from "@/modules/videos/ui/components/video-description";

interface VideoTopRowProps {
    video: VideoGetOneOutput;
}

export const VideoTopRow = ({ video }: VideoTopRowProps) => {
    return (
        <div className="mt-4 flex flex-col gap-4">
            <h1 className="text-xl font-semibold">{video.title}</h1>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <VideoOwner
                    user={{
                        ...video,
                    }}
                    videoId={video.id}
                />
                <div className="sm:bm-0 -mb-2 flex gap-2 overflow-x-auto pb-2 sm:min-w-[calc(50%-6px)] sm:justify-end sm:overflow-visible sm:pb-0">
                    <VideoReactions />
                    <VideoMenu
                        videoId={video.id}
                        variant="secondary"
                    />
                </div>
            </div>
            <VideoDescription
                compactViews="1.5K"
                expandedViews="1,523"
                compactDate="20/04/25"
                expendedDate="20th April, 2025"
                description={video.description}
            />
        </div>
    );
};
