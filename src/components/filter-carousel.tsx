"use client";

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface FilterCarouselProps {
    value?: string | null;
    isLoading?: boolean;
    onSelect: (value: string | null) => void;
    data: {
        value: string;
        label: string;
    }[];
}

export const FilterCarousel = ({ value, isLoading, data, onSelect }: FilterCarouselProps) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div className="relative w-full">
            {/* Left Fade */}
            <div
                className={cn(
                    "absolute top-0 bottom-0 left-12 z-10 w-12 bg-gradient-to-r from-white to-transparent",
                    "cursor-pointer",
                    current === 1 && "hidden",
                )}
            />
            {/* Right Fade */}
            <div
                className={cn(
                    "absolute top-0 right-12 bottom-0 z-10 w-12 bg-gradient-to-l from-white to-transparent",
                    "cursor-pointer",
                    current === count && "hidden",
                )}
            />

            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    dragFree: true,
                }}
                className="w-full px-12"
            >
                <CarouselContent className="-ml-3">
                    {!isLoading && (
                        <CarouselItem
                            onClick={() => onSelect(null)}
                            className="basis-auto pl-3"
                        >
                            <Badge
                                variant={!value ? "default" : "secondary"}
                                className="whitespace-no-wrap cursor-pointer rounded-lg px-3 py-1 text-sm"
                            >
                                All
                            </Badge>
                        </CarouselItem>
                    )}
                    {isLoading &&
                        Array.from({ length: 15 }).map((_, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-auto pl-3"
                            >
                                <Skeleton className="h-full w-[100px] rounded-lg px-3 py-1 text-sm">&nbsp;</Skeleton>
                            </CarouselItem>
                        ))}

                    {!isLoading &&
                        data.map((item) => (
                            <CarouselItem
                                key={item.value}
                                className="basis-auto pl-3"
                                onClick={() => onSelect(item.value)}
                            >
                                <Badge
                                    variant={value === item.value ? "default" : "secondary"}
                                    className="whitespace-no-wrap cursor-pointer rounded-lg px-3 py-1 text-sm"
                                >
                                    {item.label}
                                </Badge>
                            </CarouselItem>
                        ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 z-20" />
                <CarouselNext className="right-0 z-20" />
            </Carousel>
        </div>
    );
};
