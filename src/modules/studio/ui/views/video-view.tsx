import React from "react";

interface VideoViewProps {
    videoId: string;
}

export const VideoView = ({ videoId }: VideoViewProps) => {
    return <div className="max-w-screen-lg px-4 pt-2.5">{videoId}</div>;
};
