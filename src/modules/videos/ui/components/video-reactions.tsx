import React from "react";
import { Button } from "@/components/ui/button";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { VideoGetOneOutput } from "@/modules/videos/types";
import { useClerk } from "@clerk/nextjs";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

interface VideoReactionsProps {
    videoId: string;
    likes: number;
    dislikes: number;
    viewerReaction: VideoGetOneOutput["viewerReaction"];
}

// TODO: Properly implement
export const VideoReactions = ({ viewerReaction, videoId, likes, dislikes }: VideoReactionsProps) => {
    const clerk = useClerk();

    const utils = trpc.useUtils();

    const like = trpc.videoReactions.like.useMutation({
        onSuccess: () => {
            utils.videos.getOne.invalidate({ id: videoId });
            // TODO: Invalidate "liked" playlist
        },
        onError: (error) => {
            toast.error("Something went wrong! Are you signed in?");

            if (error.data?.code === "UNAUTHORIZED") {
                clerk.openSignIn();
            }
        },
    });
    const dislike = trpc.videoReactions.dislike.useMutation({
        onSuccess: () => {
            utils.videos.getOne.invalidate({ id: videoId });
            // TODO: Invalidate "liked" playlist
        },
        onError: (error) => {
            toast.error("Something went wrong! Are you signed in?");

            if (error.data?.code === "UNAUTHORIZED") {
                clerk.openSignIn();
            }
        },
    });

    return (
        <div className="flex flex-none items-center">
            <Button
                onClick={() => like.mutate({ videoId })}
                disabled={like.isPending || dislike.isPending}
                className="cursor-pointer gap-2 rounded-l-full rounded-r-none pr-4"
                variant="secondary"
            >
                <ThumbsUpIcon className={cn("size-5", viewerReaction === "like" && "fill-black")} />
                {likes}
            </Button>
            <Separator
                orientation="vertical"
                className="h-7"
            />
            <Button
                onClick={() => dislike.mutate({ videoId })}
                disabled={like.isPending || dislike.isPending}
                className="cursor-pointer gap-2 rounded-l-none rounded-r-full pl-3"
                variant="secondary"
            >
                <ThumbsDownIcon className={cn("size-5", viewerReaction === "dislike" && "fill-black")} />
                {dislikes}
            </Button>
        </div>
    );
};
