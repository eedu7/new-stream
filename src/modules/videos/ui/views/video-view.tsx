import React from "react";
import { SuggestionsSection } from "@/modules/videos/ui/sections/suggestions-section";
import { CommentsSection } from "@/modules/videos/ui/sections/comments-section";
import { VideoSection } from "@/modules/videos/ui/sections/video-section";

interface VideoViewProps {
    videoId: string;
}

export const VideoView = ({ videoId }: VideoViewProps) => {
    return (
        <div className="mb-10 flex max-w-[1700px] flex-col px-4 pt-2.5">
            <div className="flex flex-col gap-6 xl:flex-row">
                <div className="min-w-0 flex-1">
                    <VideoSection videoId={videoId} />
                    <div className="mt-4 block xl:hidden">
                        <SuggestionsSection />
                    </div>
                    <CommentsSection />
                </div>
                <div className="hidden w-full shrink-1 xl:block xl:w-[380px] 2xl:w-[460px]">
                    <SuggestionsSection />
                </div>
            </div>
        </div>
    );
};
