'use client';
import React from "react";
import { motion } from "framer-motion";
// import { api } from "nglty/trpc/react";
import type { Happening } from "@prisma/client";
import { DateSmallSquare } from "../elements/date-small";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import { CalendarDaysIcon } from "lucide-react";
import { HappeningStats } from "./happening-stats";


const EventPage: React.FC<{ event: Happening }> = ({ event }) => {
//   const utils = api.useContext();
  dayjs.extend(RelativeTime);

//   const followMutation = api.happening.follow.useMutation({
//     onSuccess: () => utils.happening.invalidate(),
//   });

//   const handleFollow = () => {
//     followMutation.mutate({ happeningId: event.id, userId:  });
//   };

  return (
    <div className={`min-h-screen w-full dark:text-white text-gray-900"}`}>
        <div className="flex flex-col h-64">
            <div className="flex h-16">
                {event.coverImageUrl && (
                <img
                    src={event.coverImageUrl}
                    alt="Cover"
                    className="w-full h-64 object-cover"
                />
                )}
            </div>
            <motion.div
          className="flex mx-auto bg-white justify-between dark:bg-aurora border-2 border-gray-300 dark:border-gray-700 shadow-lg rounded-2xl p-6 w-11/12 mt-24 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold mb-2">
                    {event.name}
                </h1>
                <div className="flex flex-row w-full justify-between gap-4">

                    {event.dateHappening && (
                        <DateSmallSquare date={event.dateHappening} />
                    )}
                    {event.venue && 
                    <div className="flex flex-col">
                    <p className="text-sm mb-2">Venue:</p>
                    <p> {event.venue || "Not specified"}</p>

                    </div>}
                    {event.isRecurring && event.recurrencePattern && (
                    
                    
                        <p className="text-sm mb-2">Recurrence: {event.recurrencePattern}</p>
                    )}
                </div>
            </div>
                <HappeningStats id={event.id} active={true} />
          {/*<div className="flex items-center justify-between mt-4">
             <span>{event.} Followers</span> */}
            {/* <button onClick={handleFollow} disabled={followMutation.isLoading}>
              {event.isFollowing ? "Unfollow" : "Follow"}
            </button> 
          </div> */}
        </motion.div>
      <div className="flex flex-row justify-center items-center gap-10 pl-2 pt-4">
      <p className="text-slate-500 text-1xl">created {dayjs(event.createdAt).fromNow()} </p>
        <CalendarDaysIcon className="w-4 h-4 text-slate-500"/>
        <p className="text-slate-500 text-1xl">happening {dayjs(event.dateHappening).fromNow()} </p>
      </div>
        </div>
      <div className="mt-24 px-4">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p>{event.text ?? "No description available."}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">External Links</h2>
          <ul className="list-disc pl-5">
            {event.externalLinks.length > 0 ? (
              event.externalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-violet-700 underline">
                    {link}
                  </a>
                </li>
              ))
            ) : (
              <p>No external links available.</p>
            )}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-gray-800">{tag}</span>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          {event.postsEnabled ? (
            <p>Posts feed will be displayed here.</p>
          ) : (
            <p>Posts are disabled for this event.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default EventPage;
