import MuxUploader from "@mux/mux-uploader-react";
import React from "react";

interface StudioUploaderProps {
    endpoint?: string | null;
    onSuccess?: () => void;
}

export const StudioUploader = ({ endpoint, onSuccess }: StudioUploaderProps) => {
    return (
        <div>
            <MuxUploader endpoint={endpoint} />
        </div>
    );
};
