// <-- hooks can only be used in client components
import { trpc } from "@/trpc/server";

export default async function Home() {
    const data = await trpc.hello({
        text: "- NewStream 0134",
    });
    return <p>Client component says: {data?.greeting}</p>;
}
