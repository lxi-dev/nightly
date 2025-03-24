'use client';
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import { api } from "nglty/trpc/react";
import type { Happening, Post } from "@prisma/client";
import { DateSmallSquare } from "../elements/date-small";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import { CalendarDaysIcon, HelpingHand } from "lucide-react";
import { HappeningStats } from "./happening-stats";
import { HelpingHands } from "../helpinghands/helping-hands";
import { Tab, TabContent, Tabs } from "../ui/tabs";
import { CreatePostComponent } from "../elements/create-post";
import { PostComponent } from "../elements/post";
import GenericNotification from "../elements/notification-pills/generic";


const EventPage: React.FC<{ event: Happening, posts?: Post[], userId?: string }> = ({ event, posts, userId }) => {
//   const utils = api.useContext();
  dayjs.extend(RelativeTime);
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    if(!userId) return;
    setOwner(event.creatorId === userId);
  }, [userId])

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
                <section>

        </section>      
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
              {event.helpingHandsEnabled && <span>participate</span>}
                <HappeningStats id={event.id} active={true} />
        </motion.div>
        </div>    
      <div className="mt-24">
        <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <GenericNotification text={tag}/>
            ))}
          </div>
        <Tabs>
          <Tab id={'info'} label={'Information'}>
            <TabContent>
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
            </TabContent>
          </Tab>
          <Tab id={'posts'} label={'Posts'}>
            <TabContent>
              <section className="flex flex-col">
                <CreatePostComponent type={"happening"} session={null} data={{happeningId: event.id}} />
              { !posts && <h2 className="text-2xl text-black dark:text-white">There are no Posts yet.</h2>}
              </section>
              <div className="flex flex-col space-y-4">
        { posts?.slice().reverse().map((item, index) => (
              <PostComponent key={index} post={item} />)
        )}
            </div>
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Posts</h2>
              {event.postsEnabled ? (
                <p>Posts feed will be displayed here.</p>
              ) : (
                <p>Posts are disabled for this event.</p>
              )}
            </section>
            </TabContent>
          </Tab>
          {event.helpingHandsEnabled &&
          
          <Tab id="helping" label="Helping Hands">
            <TabContent>
            <h2 className="text-black/10 dark:text-slate-800 text-2xl"><HelpingHand /> Helping Hands</h2>
            <HelpingHands happeningId={event.id} owner={owner}/>

            </TabContent>
          </Tab>
          }
        </Tabs>
      </div>
      <div className="flex flex-row justify-center items-center gap-10 pl-2 pt-4">
      <p className="text-slate-500 text-1xl">created {dayjs(event.createdAt).fromNow()} </p>
        <CalendarDaysIcon className="w-4 h-4 text-slate-500"/>
        <p className="text-slate-500 text-1xl">happening {dayjs(event.dateHappening).fromNow()} </p>
      </div>
    </div>
  );
};

export default EventPage;
