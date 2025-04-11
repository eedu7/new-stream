"use client";

import React, { Suspense } from "react";
import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { VideoThumbnail } from "@/modules/videos/ui/components/video-thumbnail";
import { snakeCaseToTitle } from "@/lib/utils";
import { format } from "date-fns";

export const VideosSection = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <VideosSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    );
};

export const VideosSectionSuspense = () => {
    const [videos, query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
        {
            limit: DEFAULT_LIMIT,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
    );

    return (
        <div>
            <div className="border-y">
                <Table className="min-w-[85vw] border-2 border-blue-500">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[510px] pl-6">Video</TableHead>
                            <TableHead>Visibility</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Views</TableHead>
                            <TableHead className="text-right">Comments</TableHead>
                            <TableHead className="pr-6 text-right">Likes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {videos.pages
                            .flatMap((page) => page.items)
                            .map((video) => (
                                <Link
                                    href={`/studio/videos/${video.id}`}
                                    key={video.id}
                                    legacyBehavior
                                >
                                    <TableRow className="cursor-pointer">
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <div className="relative aspect-video w-36 shrink-0">
                                                    <VideoThumbnail
                                                        imageUrl={video.thumbnailUrl}
                                                        previewUrl={video.previewUrl}
                                                        title={video.title}
                                                        duration={video.duration || 0}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-y-1 overflow-hidden">
                                                    <span className="line-clamp-1 text-sm">{video.title}</span>
                                                    <span className="text-muted-foreground line-clamp-1 text-xs">
                                                        {video.description || "No" + " description"}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>visibility</TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                {snakeCaseToTitle(video.muxStatus || "error")}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="truncate text-xs">
                                                {format(new Date(video.createdAt), "d MMM yyyy")}
                                            </div>
                                        </TableCell>
                                        <TableCell>views</TableCell>
                                        <TableCell>comments</TableCell>
                                        <TableCell>likes</TableCell>
                                    </TableRow>
                                </Link>
                            ))}
                    </TableBody>
                </Table>
            </div>

            <InfiniteScroll
                isManual={true}
                hasNextPage={query.hasNextPage}
                isFetchingNextPage={query.isFetchingNextPage}
                fetchNextPage={query.fetchNextPage}
            />
        </div>
    );
};
