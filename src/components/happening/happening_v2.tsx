'use client';
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Happening } from "@prisma/client";
import { DateSmallSquare } from "../elements/date-small";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import { CalendarDaysIcon, MapPin } from "lucide-react";
import { HelpingHands } from "../helpinghands/helping-hands";
import { Tab, TabContent, Tabs } from "../ui/tabs";
import { CreatePostComponent } from "../elements/create-post";
import { PostComponent } from "../elements/post";
import GenericNotification from "../elements/notification-pills/generic";
import { HappeningActions } from "./happening-actions";
import { api } from "nglty/trpc/react";
import { InviteToHappeningButton } from "./invite-button";
import { useLoading } from "nglty/contexts/loadingContext";

type FollowersProp = {
  followers: number;
  pending: number;
  isFollowing: boolean;
}

const EventPage: React.FC<{ event: Happening, userId?: string, followers: FollowersProp }> = ({ event, userId, followers }) => {
  const {hideLoading }= useLoading()
  const { data: posts } = api.happening.getPostsByHappening.useQuery(
    { happeningId : event.id }, 
    { enabled : !!event.id && followers.isFollowing}
  )

  dayjs.extend(RelativeTime);
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    hideLoading();
    if(!userId) return;
    setOwner(event.creatorId === userId);
  }, [userId])

  const follow = api.happening.follow.useMutation({
    onSuccess: async () => {
      console.log("mutation");
    },
  });

  const handleFollow = async () => {
    try {
      if (!userId) return;
        await follow.mutateAsync({
          userId: userId,
          status: 'going',
          happeningId: event.id
        });
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <section>
    <div className={`min-h-screen w-full dark:text-white text-gray-900"}`}>
      { event.coverImageUrl && 
        <img
          src={event.coverImageUrl}
          alt="cover"
          className="w-full h-36 object-cover rounded-2xl border md:border-2 border-gray-300 dark:border-gray-700 translate-y-8 z-0"
        />
      }
      <motion.div
          className="flex mx-auto bg-white flex-col md:flex-row justify-between dark:bg-aurora border-2 border-gray-300 dark:border-gray-700 shadow-lg rounded-2xl p-4 z-10 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
            <div className="flex flex-row">
                    {event.dateHappening && (
                        <DateSmallSquare date={event.dateHappening} />
                    )}
                    <div className="ml-2">
                <h1 className="text-2xl font-bold">
                    {event.name}
                </h1>   
                <div className="flex flex-col md:flex-row w-full justify-between gap-4">
                    {event.venue && 
                    <div className="flex flex-row items-center justify-baseline">
                      <MapPin className="w-4 h-4 text-sm mr-1"/>
                      <p> {event.venue || "Not specified"}</p>
                    </div>}
                    {event.isRecurring && event.recurrencePattern && (             
                      <p className="text-sm mb-2">Recurrence: {event.recurrencePattern}</p>
                    )}
                </div>
                </div>
            </div>
            <div className="mt-4 md:mt-0">
              <HappeningActions 
                happeningId={event.id}
                owner={owner} 
                followers={followers.followers} 
                pending={followers.pending}
                isFollowing={followers.isFollowing} 
                onFollow={handleFollow} 
                participateEnabled={event.helpingHandsEnabled}
              />
            </div>
        </motion.div>
        <div className="flex flex-row w-full justify-between px-4 mt-2">

        <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <GenericNotification text={tag}/>
            ))}
          </div>
          <InviteToHappeningButton happeningId={event.id}/>

        </div>
      <motion.div className="mt-4">
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
                { followers.isFollowing && 
              <section className="flex flex-col"> 
                <CreatePostComponent type={"happening"} data={{happeningId: event.id}} />
              { !posts && <h2 className="text-2xl text-black dark:text-white">There are no Posts yet.</h2>}
              <div className="flex flex-col space-y-4">
                { posts?.slice().reverse().map((item, index) => (
                  <PostComponent key={index} post={item} />)
                )}
                    </div>
                </section>
              }
              { !followers.isFollowing && 
              <section className="flex flex-col">
                <p>Follow this happening to see messages.</p>
              </section>}
            </TabContent>
          </Tab>
          {event.helpingHandsEnabled &&
          
          <Tab id="helping" label="Helping Hands">
            <TabContent>
            <HelpingHands happeningId={event.id} owner={owner}/>

            </TabContent>
          </Tab>
          }
        </Tabs>
      </motion.div>
      <div className="flex flex-row justify-center items-center gap-10 pl-2 pt-4">
      <p className="text-slate-500 text-1xl">created {dayjs(event.createdAt).fromNow()} </p>
        <CalendarDaysIcon className="w-4 h-4 text-slate-500"/>
        <p className="text-slate-500 text-1xl">happening {dayjs(event.dateHappening).fromNow()} </p>
      </div>
      </div>    

    </section>
  );
};

export default EventPage;
