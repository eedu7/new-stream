import React from "react";
import MuxPlayer from "@mux/mux-player-react";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";

interface VideoPlayerProps {
    playbackId?: string | null | undefined;
    thumbnailUrl?: string | null | undefined;
    autoPlay?: boolean;
    onPlay?: () => void;
}

export const VideoPlayer = ({ playbackId, thumbnailUrl, onPlay, autoPlay }: VideoPlayerProps) => {
    return (
        <MuxPlayer
            playbackId={playbackId || ""}
            poster={thumbnailUrl || THUMBNAIL_FALLBACK}
            playerInitTime={0}
            thumbnailTime={0}
            className="h-full w-full object-contain"
            accentColor="#FF2056"
            autoPlay={autoPlay}
            onPlay={onPlay}
        />
    );
};
