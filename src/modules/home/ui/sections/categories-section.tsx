"use client";

import React, { Suspense } from "react";
import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { FilterCarousel } from "@/components/filter-carousel";

interface CategoriesSectionProps {
    categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <CategoriesSectionSuspense categoryId={categoryId} />
            </ErrorBoundary>
        </Suspense>
    );
};

export const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
    const [categories] = trpc.categories.getMany.useSuspenseQuery();

    const data = categories.map(({ name, id }) => ({
        value: id,
        label: name,
    }));

    return (
        <FilterCarousel
            value={categoryId}
            data={data}
        />
    );
};
