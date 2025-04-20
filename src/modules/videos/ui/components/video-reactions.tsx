import React from "react";
import { Button } from "@/components/ui/button";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

// TODO: Properly implement
export const VideoReactions = () => {
    const viewerReaction: "like" | "dislike" = "like";

    return (
        <div className="flex flex-none items-center">
            <Button
                className="gap-2 rounded-l-full rounded-r-none pr-4"
                variant="secondary"
            >
                <ThumbsUpIcon className={cn("size-5", viewerReaction === "like" && "fill-black")} />
                {1}
            </Button>
            <Separator
                orientation="vertical"
                className="h-7"
            />
            <Button
                className="gap-2 rounded-l-none rounded-r-full pl-3"
                variant="secondary"
            >
                <ThumbsDownIcon className={cn("size-5", viewerReaction !== "like" && "fill-black")} />
                {1}
            </Button>
        </div>
    );
};
