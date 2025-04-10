"use client";

import { trpc } from "@/trpc/client";

export const PageClient = () => {
    const [data] = trpc.categories.getMany.useSuspenseQuery();

    return <div>Page client says: {JSON.stringify(data)}</div>;
};
