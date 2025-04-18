'use client';
import React from "react";
import Link from "next/link";
import { api } from "nglty/trpc/react";
import type { Activity } from "@prisma/client";

const ActivityFeed = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = api.activity.getGlobalActivities.useInfiniteQuery(
    { limit: 10 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const activities = data?.pages.flatMap((page) => page.activities) ?? [];

  const renderActivity = (activity: Activity) => {
    switch (activity.type) {
      case "create":
        return (
          <p className="text-sm">
            <Link href="#" className="font-medium text-rose-600 hover:underline">
              @{activity.userId}
            </Link>{" "}
            <span className="text-zinc-500 dark:text-zinc-400">
              created a new{" "}
              <Link
                href={`/happenings/${activity.targetId}`}
                className="font-medium hover:underline"
              >
                {activity.targetType.toLowerCase()}
              </Link>
              : {activity.description}
            </span>
          </p>
        );

      case "update":
        return (
          <p className="text-sm">
            <Link href="#" className="font-medium text-rose-600 hover:underline">
            @{activity.userId}
            </Link>{" "}
            <span className="text-zinc-500 dark:text-zinc-400">
              updated{" "}
              <Link
                href={`/happenings/${activity.targetId}`}
                className="font-medium hover:underline"
              >
                {activity.targetType.toLowerCase()}
              </Link>
              : {activity.description}
            </span>
          </p>
        );

      case "join":
        return (
          <p className="text-sm">
            <Link href="#" className="font-medium text-rose-600 hover:underline">
            @{activity.userId}
            </Link>{" "}
            <span className="text-zinc-500 dark:text-zinc-400">
              joined the{" "}
              <Link
                href={`/happenings/${activity.targetId}`}
                className="font-medium hover:underline"
              >
                {activity.targetType.toLowerCase()}
              </Link>
            </span>
          </p>
        );

      case "comment":
        return (
          <p className="text-sm">
            <Link href="#" className="font-medium text-rose-600 hover:underline">
            @{activity.userId}
            </Link>{" "}
            <span className="text-zinc-500 dark:text-zinc-400">
              commented on{" "}
              <Link
                href={`/happenings/${activity.targetId}`}
                className="font-medium hover:underline"
              >
                {activity.targetType.toLowerCase()}
              </Link>
            </span>
          </p>
        );

      default:
        return (
          <p className="text-sm">
            <Link href="#" className="font-medium text-rose-600 hover:underline">
            @{activity.userId}
            </Link>{" "}
            <span className="text-zinc-500 dark:text-zinc-400">
              performed an action: {activity.description}
            </span>
          </p>
        );
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-3 pb-4 border-b dark:border-zinc-800"
        >
          <div className="bg-fuchsia-500 h-8 w-8 rounded-full" />
          <div className="space-y-1">
            {renderActivity(activity)}
            <time className="text-xs text-zinc-500 dark:text-zinc-400">
              {new Date(activity.createdAt).toLocaleTimeString()}
            </time>
          </div>
        </div>
      ))}

      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-rose-600 rounded hover:bg-rose-500 disabled:bg-zinc-600 disabled:cursor-not-allowed"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;