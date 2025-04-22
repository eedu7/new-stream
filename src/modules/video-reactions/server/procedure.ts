import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { db } from "@/db";
import { videoReactions } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const videoReactionsRouter = createTRPCRouter({
    like: protectedProcedure.input(z.object({ videoId: z.string().uuid() })).mutation(async ({ input, ctx }) => {
        const { videoId } = input;

        const { id: userId } = ctx.user;

        const [existingVideoReactionLiked] = await db
            .select()
            .from(videoReactions)
            .where(
                and(
                    eq(videoReactions.userId, userId),
                    eq(videoReactions.videoId, videoId),
                    eq(videoReactions.type, "like"),
                ),
            );

        if (existingVideoReactionLiked) {
            const [deletedViewerReaction] = await db
                .delete(videoReactions)
                .where(and(eq(videoReactions.userId, userId), eq(videoReactions.videoId, videoId)))
                .returning();

            return deletedViewerReaction;
        }

        /**
         * If the user has already `disliked` the video,
         * in the above query, we will not get any existing users,
         * due to `like` checking.
         *
         * So, `onConflictDoUpdate`, check if a conflict occurs,
         * when user goes from disliking to liking, then
         * find the conflict and set it to the right type.
         *
         * If user has not given any reaction, conflict will not occur,
         * and a reaction of type of like will be created
         * */
        const [createdVideoReaction] = await db
            .insert(videoReactions)
            .values({
                userId: userId,
                videoId: videoId,
                type: "like",
            })
            .onConflictDoUpdate({
                target: [videoReactions.userId, videoReactions.videoId],
                set: {
                    type: "like",
                },
            })
            .returning();

        return createdVideoReaction;
    }),
    dislike: protectedProcedure.input(z.object({ videoId: z.string().uuid() })).mutation(async ({ input, ctx }) => {
        const { videoId } = input;

        const { id: userId } = ctx.user;

        const [existingVideoReactionDisliked] = await db
            .select()
            .from(videoReactions)
            .where(
                and(
                    eq(videoReactions.userId, userId),
                    eq(videoReactions.videoId, videoId),
                    eq(videoReactions.type, "dislike"),
                ),
            );

        if (existingVideoReactionDisliked) {
            const [deletedViewerReaction] = await db
                .delete(videoReactions)
                .where(and(eq(videoReactions.userId, userId), eq(videoReactions.videoId, videoId)))
                .returning();

            return deletedViewerReaction;
        }

        const [createdVideoReaction] = await db
            .insert(videoReactions)
            .values({
                userId: userId,
                videoId: videoId,
                type: "dislike",
            })
            .onConflictDoUpdate({
                target: [videoReactions.userId, videoReactions.videoId],
                set: {
                    type: "dislike",
                },
            })
            .returning();

        return createdVideoReaction;
    }),
});
