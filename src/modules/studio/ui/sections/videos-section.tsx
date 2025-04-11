"use client";

import React, { Suspense } from "react";
import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "@/components/infinite-scroll";

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
    const [data, query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
        {
            limit: DEFAULT_LIMIT,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
    );

    return (
        <div>
            {JSON.stringify(data)}
            <InfiniteScroll
                isManual={true}
                hasNextPage={query.hasNextPage}
                isFetchingNextPage={query.isFetchingNextPage}
                fetchNextPage={query.fetchNextPage}
            />
        </div>
    );
};
