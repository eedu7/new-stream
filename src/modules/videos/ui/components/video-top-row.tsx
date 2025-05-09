import React, { useMemo } from "react";

import { VideoGetOneOutput } from "@/modules/videos/types";
import { VideoOwner } from "@/modules/videos/ui/components/video-owner";
import { VideoReactions } from "@/modules/videos/ui/components/video-reactions";
import { VideoMenu } from "@/modules/videos/ui/components/video-menu";
import { VideoDescription } from "@/modules/videos/ui/components/video-description";
import { format, formatDistanceToNow } from "date-fns";

interface VideoTopRowProps {
    video: VideoGetOneOutput;
}

export const VideoTopRow = ({ video }: VideoTopRowProps) => {
    const compactViews = useMemo(() => {
        return Intl.NumberFormat("en", {
            notation: "compact",
        }).format(video.viewCount);
    }, [video.viewCount]);
    const expandedViews = useMemo(() => {
        return Intl.NumberFormat("en", {
            notation: "standard",
        }).format(video.viewCount);
    }, [video.viewCount]);

    const compactDate = useMemo(() => {
        return formatDistanceToNow(video.createdAt, { addSuffix: true });
    }, [video.createdAt]);

    const expandedDate = useMemo(() => {
        return format(video.createdAt, "d MMM yyyy");
    }, [video.createdAt]);

    return (
        <div className="mt-4 flex flex-col gap-4">
            <h1 className="text-xl font-semibold">{video.title}</h1>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <VideoOwner
                    user={video.user}
                    videoId={video.id}
                />
                <div className="sm:bm-0 -mb-2 flex gap-2 overflow-x-auto pb-2 sm:min-w-[calc(50%-6px)] sm:justify-end sm:overflow-visible sm:pb-0">
                    <VideoReactions
                        videoId={video.id}
                        likes={video.likeCount}
                        dislikes={video.dislikeCount}
                        viewerReaction={video.viewerReaction}
                    />
                    <VideoMenu
                        videoId={video.id}
                        variant="secondary"
                    />
                </div>
            </div>
            <VideoDescription
                compactViews={compactViews}
                expandedViews={expandedViews}
                compactDate={compactDate}
                expendedDate={expandedDate}
                description={video.description}
            />
        </div>
    );
};
