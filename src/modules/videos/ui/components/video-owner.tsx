import React from "react";
import { VideoGetOneOutput } from "@/modules/videos/types";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface VideoOwnerProps {
    user: VideoGetOneOutput["user"];
    videoId: string;
}

export const VideoOwner = ({ videoId, user }: VideoOwnerProps) => {
    const { userId } = useAuth();

    return (
        <div className="ggap-3 flex min-w-0 items-center justify-between sm:items-start sm:justify-start">
            <Link href={`/users/${user.id}`}>
                <div className="flex min-w-0 items-center gap-3">
                    <UserAvatar
                        name={user.name}
                        imageUrl={user.imageUrl}
                        size="lg"
                    />
                    {/* Properly fill user count */}
                    <span className="text-muted-foreground line-clamp-1 text-sm">{0} subscribers</span>
                </div>
            </Link>
            {userId === user.clerkId ? (
                <Button
                    className="rounded-full"
                    variant="secondary"
                >
                    <Link href={`/studio/videos/${videoId}`}>Edit video</Link>
                </Button>
            ) : (
                // <SubscriptionButton />
                <Button
                    className="rounded-full"
                    variant="secondary"
                >
                    Subscribe
                </Button>
            )}
        </div>
    );
};
