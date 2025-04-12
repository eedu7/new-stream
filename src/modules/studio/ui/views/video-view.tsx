import React from "react";
import { FormSection } from "@/modules/studio/ui/sections/form-section";

interface VideoViewProps {
    videoId: string;
}

export const VideoView = ({ videoId }: VideoViewProps) => {
    return (
        <div className="border border-rose-400 px-4 pt-2.5">
            <FormSection videoId={videoId} />
        </div>
    );
};
