"use client";

import React, { Suspense, useState } from "react";
import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    CopyCheckIcon,
    CopyIcon,
    EditIcon,
    Globe2Icon,
    ImagePlusIcon,
    Loader2Icon,
    LockIcon,
    MoreVerticalIcon,
    RotateCcwIcon,
    SparklesIcon,
    TrashIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { videoUpdateSchema } from "@/db/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { VideoPlayer } from "@/modules/videos/ui/components/video-player";
import Link from "next/link";
import { snakeCaseToTitle } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";
import { ThumbnailUploadModal } from "@/modules/studio/ui/components/thumbnail-upload-modal";
import { Input } from "@/components/ui/input";
import { ThumbnailGenerateModal } from "@/modules/studio/ui/components/thumbnail-generate-modal";
import { Skeleton } from "@/components/ui/skeleton";

interface FormSectionProps {
    videoId: string;
}

export const FormSection = ({ videoId }: FormSectionProps) => {
    return (
        <Suspense fallback={<FormSectionSkeleton />}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <FormSectionSuspense videoId={videoId} />
            </ErrorBoundary>
        </Suspense>
    );
};

const FormSectionSkeleton = () => {
    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-7 w-32" />
                    <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-9 w-24" />
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                <div className="space-y-8 lg:col-span-3">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-[220px] w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-[84px] w-[153px]" />
                    </div>{" "}
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-8 w-36" />
                    </div>
                </div>
                <div className="flex flex-col gap-y-8 lg:col-span-2">
                    <div className="flex flex-col gap-4 overflow-hidden rounded-xl bg-[#F9F9F9]">
                        <Skeleton className="aspect-video" />
                        <div className="space-y-6 p-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-5 w-full" />
                            </div>{" "}
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-5 w-32" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-16" />
                                <Skeleton className="h-5 w-32" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-8 w-32" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const FormSectionSuspense = ({ videoId }: FormSectionProps) => {
    const router = useRouter();
    const utils = trpc.useUtils();
    const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });
    const [categories] = trpc.categories.getMany.useSuspenseQuery();
    const [thumbnailModalOpen, setThumbnailModalOpen] = useState(false);
    const [thumbnailGenerateModalOpen, setThumbnailGenerateModalOpen] = useState(false);

    const update = trpc.videos.update.useMutation({
        onSuccess: () => {
            utils.studio.getMany.invalidate();
            utils.studio.getOne.invalidate({ id: videoId });
            toast.success("Video updated");
        },
        onError: () => {
            toast.error("Something went wrong.");
        },
    });
    const remove = trpc.videos.remove.useMutation({
        onSuccess: () => {
            utils.studio.getMany.invalidate();
            toast.success("Video removed");
            router.push("/studio");
        },
        onError: () => {
            toast.error("Something went wrong.");
        },
    });
    const generateDescription = trpc.videos.generateDescription.useMutation({
        onSuccess: () => {
            toast.success("Background job started", {
                description: "This may take time",
            });
        },
        onError: () => {
            toast.error("Something went wrong.");
        },
    });
    const generateTitle = trpc.videos.generateTitle.useMutation({
        onSuccess: () => {
            toast.success("Background job started", {
                description: "This may take time",
            });
        },
        onError: () => {
            toast.error("Something went wrong.");
        },
    });
    const restoreThumbnail = trpc.videos.restoreThumbnail.useMutation({
        onSuccess: () => {
            utils.studio.getMany.invalidate();
            utils.studio.getOne.invalidate({ id: videoId });
            toast.success("Thumbnail restored");
        },
        onError: () => {
            toast.error("Something went wrong.");
        },
    });

    const form = useForm<z.infer<typeof videoUpdateSchema>>({
        resolver: zodResolver(videoUpdateSchema),
        defaultValues: video,
    });

    const onSubmit = (data: z.infer<typeof videoUpdateSchema>) => {
        update.mutate(data);
    };
    // TODO: Change if deploying outside of VERCEL
    const fullUrl = `${process.env.VERCEL_URL || "http://localhost:3000"}/videos/${videoId}`;
    const [isCopied, setIsCoped] = useState(false);

    const onCopy = async () => {
        await navigator.clipboard.writeText(fullUrl);
        setIsCoped(true);
        setTimeout(() => setIsCoped(false), 2000);
    };

    return (
        <>
            <ThumbnailGenerateModal
                videoId={videoId}
                open={thumbnailGenerateModalOpen}
                onOpenChange={setThumbnailGenerateModalOpen}
            />

            <ThumbnailUploadModal
                videoId={videoId}
                open={thumbnailModalOpen}
                onOpenChange={setThumbnailModalOpen}
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="mb-6 flex w-full items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Video details</h1>
                            <p className="text-muted-foreground text-xs">Manage your video details</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Button
                                variant="secondary"
                                disabled={update.isPending}
                                className="cursor-pointer"
                                type="submit"
                            >
                                {update.isPending ? (
                                    <>
                                        <Loader2Icon className="size-4 animate-spin" />
                                        Updating
                                    </>
                                ) : (
                                    <>
                                        <EditIcon className="size-4" />
                                        Update
                                    </>
                                )}
                                {/*Save*/}
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="cursor-pointer"
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <MoreVerticalIcon />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() => remove.mutate({ id: videoId })}
                                        className="flex cursor-pointer items-center"
                                    >
                                        <TrashIcon className="mr-2 size-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                        <div className="space-y-8 lg:col-span-3">
                            <FormField
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <div className="flex items-center gap-x-2">
                                                Title
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    variant="outline"
                                                    className="size-6 cursor-pointer rounded-full [&_svg]:size-3"
                                                    onClick={() => generateTitle.mutate({ id: videoId })}
                                                    disabled={generateTitle.isPending || !video.muxTrackId}
                                                >
                                                    {generateTitle.isPending ? (
                                                        <Loader2Icon className="animate-spin" />
                                                    ) : (
                                                        <SparklesIcon />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Add a title to your videos"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                name="title"
                            />
                            <FormField
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <div className="flex items-center gap-x-2">
                                                Description
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    variant="outline"
                                                    className="size-6 cursor-pointer rounded-full [&_svg]:size-3"
                                                    onClick={() => generateDescription.mutate({ id: videoId })}
                                                    disabled={generateDescription.isPending || !video.muxTrackId}
                                                >
                                                    {generateDescription.isPending ? (
                                                        <Loader2Icon className="animate-spin" />
                                                    ) : (
                                                        <SparklesIcon />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                rows={10}
                                                value={field.value?.toString() ?? ""}
                                                className="resize-none pr-10"
                                                placeholder="Add a description to your video"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                name="description"
                            />
                            <FormField
                                control={form.control}
                                name="thumbnailUrl"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Thumbnail</FormLabel>
                                        <div className="group relative h-[84px] w-[153px] border border-dashed border-neutral-400 p-0.5">
                                            <Image
                                                src={video.thumbnailUrl ?? THUMBNAIL_FALLBACK}
                                                alt="Thumbnail"
                                                className="object-cover"
                                                fill
                                            />
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        type="button"
                                                        size="icon"
                                                        className="absolute top-1 right-1 size-7 rounded-full bg-black/50 opacity-100 duration-300 group-hover:opacity-100 hover:bg-black/50 md:opacity-0"
                                                    >
                                                        <MoreVerticalIcon className="text-white" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="start"
                                                    side="right"
                                                >
                                                    <DropdownMenuItem onClick={() => setThumbnailModalOpen(true)}>
                                                        <ImagePlusIcon className="mr-1 size-4" />
                                                        Change
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => setThumbnailGenerateModalOpen(true)}
                                                    >
                                                        <SparklesIcon className="mr-1 size-4" />
                                                        AI generated
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => restoreThumbnail.mutate({ id: videoId })}
                                                    >
                                                        <RotateCcwIcon className="mr-1 size-4" />
                                                        Restore
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value ?? undefined}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                name="categoryId"
                            />
                        </div>
                        <div className="flex flex-col gap-y-8 lg:col-span-2">
                            <div className="flex h-fit flex-col gap-4 overflow-hidden rounded-xl bg-[#F9F9F9]">
                                <div className="relative aspect-video overflow-hidden">
                                    <VideoPlayer
                                        playbackId={video.muxPlaybackId}
                                        thumbnailUrl={video.thumbnailUrl}
                                    />
                                </div>
                                <div className="flex flex-col gap-y-6 p-4">
                                    <div className="flex items-center justify-between gap-x-2">
                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-muted-foreground text-xs">Video Link</p>
                                            <div className="flex items-center gap-x-2">
                                                <Link href={`/videos/${video.id}`}>
                                                    <p className="line-clamp-1 text-sm text-blue-500">{fullUrl}</p>
                                                </Link>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="shrink-0 cursor-pointer"
                                                    onClick={onCopy}
                                                    disabled={isCopied}
                                                >
                                                    {isCopied ? <CopyCheckIcon /> : <CopyIcon />}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-muted-foreground text-xs">Video status</p>
                                            <p className="text-sm">
                                                {snakeCaseToTitle(video.muxStatus || "preparing")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-muted-foreground text-xs">Subtitles status</p>
                                            <p className="text-sm">
                                                {snakeCaseToTitle(video.muxTrackStatus || "no_subtitles")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Visibility</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value ?? undefined}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="private">
                                                    <div className="flex items-center gap-x-2">
                                                        <LockIcon className="mr-2 size-4" />
                                                        Private
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="public">
                                                    <div className="flex items-center gap-x-2">
                                                        <Globe2Icon className="mr-2 size-4" />
                                                        Public
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                name="visibility"
                            />
                        </div>
                    </div>
                </form>
            </Form>
        </>
    );
};
