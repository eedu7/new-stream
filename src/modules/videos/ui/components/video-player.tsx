import React from "react";
import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
    playbackId?: string | null | undefined;
    thumbnailUrl?: string | null | undefined;
    autoPlay?: boolean;
    onPlay?: () => void;
}

export const VideoPlayer = ({ playbackId, thumbnailUrl, onPlay, autoPlay }: VideoPlayerProps) => {
    if (!playbackId) return null;

    return (
        <MuxPlayer
            playbackId={playbackId}
            poster={thumbnailUrl || "/placeholder.svg"}
            playerInitTime={0}
            thumbnailTime={0}
            className="h-full w-full object-contain"
            accentColor="#FF2056"
            autoPlay={autoPlay}
            onPlay={onPlay}
        />
    );
};
