import React, { useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";

interface InfiniteScrollProps {
    isManual?: boolean;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
}

export const InfiniteScroll = ({ fetchNextPage, hasNextPage, isFetchingNextPage, isManual }: InfiniteScrollProps) => {
    const { targetRef, isIntersecting } = useIntersectionObserver({
        threshold: 0.5,
        rootMargin: "100px",
    });

    useEffect(() => {
        if (isIntersecting && hasNextPage && !isFetchingNextPage && !isManual) {
            fetchNextPage();
        }
    }, [isIntersecting, hasNextPage, isFetchingNextPage, isManual, fetchNextPage]);

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div
                ref={targetRef}
                className="h-1"
            />
            {hasNextPage ? (
                <Button
                    variant="secondary"
                    className="cursor-pointer"
                    disabled={!hasNextPage || isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                >
                    {isFetchingNextPage ? "Loading..." : "Load more"}
                </Button>
            ) : (
                <p className="text-muted-foregroundo text-xs">You have reached the end of the list</p>
            )}
        </div>
    );
};
