"use client";

import React, { Suspense } from "react";
import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { FilterCarousel } from "@/components/filter-carousel";
import { useRouter } from "next/navigation";

interface CategoriesSectionProps {
    categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
    return (
        <Suspense fallback={<CategoriesSectionSuspenseFallback />}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <CategoriesSectionSuspense categoryId={categoryId} />
            </ErrorBoundary>
        </Suspense>
    );
};

const CategoriesSectionSuspenseFallback = () => {
    return (
        <FilterCarousel
            isLoading={true}
            data={[]}
            onSelect={() => {}}
        />
    );
};

export const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
    const router = useRouter();

    const [categories] = trpc.categories.getMany.useSuspenseQuery();

    const data = categories.map(({ name, id }) => ({
        value: id,
        label: name,
    }));

    const onSelect = (value: string | null) => {
        const url = new URL(window.location.href);

        if (value) {
            url.searchParams.set("categoryId", value);
        } else {
            url.searchParams.delete("categoryId");
        }

        router.push(url.toString());
    };

    return (
        <FilterCarousel
            value={categoryId}
            data={data}
            onSelect={onSelect}
        />
    );
};
