import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { videos } from "@/db/schema";
import { mux } from "@/lib/mux";

export const videosRouter = createTRPCRouter({
    create: protectedProcedure.mutation(async ({ ctx }) => {
        const { id: userId } = ctx.user;

        const upload = await mux.video.uploads.create({
            new_asset_settings: {
                passthrough: userId,
                playback_policy: ["public"],
                mp4_support: "standard",
            },
            cors_origin: "*", // TODO: in production, set to your url
        });

        const [video] = await db
            .insert(videos)
            .values({
                userId,
                title: "Undefined",
            })
            .returning();

        return {
            video: video,
        };
    }),
});
