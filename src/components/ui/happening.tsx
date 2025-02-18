'use client';
import type { Happening, Post } from "@prisma/client";
import RelativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useState } from "react";
import { StarsBackground } from "../backgrounds/stars";
import { BentoBox } from "../elements/box";
import { ArrowRightIcon, CalendarDaysIcon, EyeIcon, EyeSlashIcon, HomeIcon } from "@heroicons/react/24/outline";
import TimeScaleColumns from "./helping-hands";
import type { Session } from "next-auth";
import { api } from "nglty/trpc/react";
import { UserProfileIcon } from "../elements/user-icon";

export type PostCreate = {
  text: string,
  creatorId: string,
  happeningId: string,
}

export const HappeningView = ({ data, session, posts } : { data: Happening, session: Session | null, posts: Post[]}) => {
  const [newPost, setNewPost] = useState<string>('')
  const [_pending, setPending] = useState(false);

    const [timeFrom, _setTimeFrom] = useState<string | null>(() => {
        if (!data.createdAt) return null;
        dayjs.extend(RelativeTime);
        return dayjs(data.createdAt).fromNow();
    });
    const [timeTo, _setTimeTo] = useState<string | null>(() => {
        if (!data.dateHappening) return null;
        dayjs.extend(RelativeTime);
        return dayjs(data.dateHappening).fromNow();
    })

    const [owner, _setOwner] = useState(() => {
      if(!session) return;
      return data.creatorId === session.user.id;
    })

    const createPost = api.happening.createPost.useMutation({
      onSuccess: async () => {
        console.log("mutation");
      },
    });

      const submitPost = async () => {
        try {
          setPending(true);
          if(!session?.user.id) return;
          const post = await createPost.mutateAsync({
            creatorId: session?.user.id,
            text: newPost ?? '',
            happeningId: data.id
          });
      
          console.log("Happening post:", post);
          setNewPost('');
          posts.push(post);
        } catch (error) {
          console.error("Error creating happening:", error);
        }
        setPending(false);
      };
    
    const items = [1, 2, 3, 4, 5]; // Example array
      const helpingHandsStartTime = new Date();
  return (
    <div className="relative flex flex-col gap-4 pb-0 h-full bg-white dark:bg-black">
    <div className={`relative z-10 grid`}>
      <div className={`flex flex-row w-full h-32 justify-between items-end bg-${data.color} shadow-lg pb-4 pl-12 pr-12`}>
      <div className="flex flex-col justify-start items-start">
        <h5 className="dark:text-white/50 text-black/50">created by:{data?.creatorId.toString()}</h5>
        <h1 className={'flex text-md text-3xl text-white dark:text-white'}>{data?.name}</h1>

      </div>
        <div className="flex flex-col justify-between items-end">
          <div className="absolute dark:text-black/30 text-white/30 overflow-hidden -translate-y-12">
          { data.type === 'placebound' && <HomeIcon className="w-[128px] h-[128px]"/>}
          { data.type === 'private' && <EyeSlashIcon className="w-[128px] h-[128px]"/>}
          { data.type === 'public' && <EyeIcon className="w-[128px] h-[128px]"/>}
          </div>
          <h4 className="relative text-white mb-2 dark:text-white">@ {data?.venue.toString()}</h4>        
          <button className="relative w-24 h-8 bg-white dark:bg-black hover:shadow-lg hover:bg-gray-50 text-black dark:text-white rounded-md text-sm font-lg shadow-sm transition">
          {!owner ? 'Join' : 'Edit'} 
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-start items-center w-full gap-4 border-t border-black/10 pl-12 pt-4">
        <p className="text-slate-500 text-1xl">created {timeFrom} </p>
        <CalendarDaysIcon className="w-4 h-4 text-slate-500"/>
        <p className="text-slate-500 text-1xl">happening {timeTo} </p>
      </div>
    </div>


      <div className="flex flex-col md:flex-row gap-2 pl-12 pr-12 w-full justify-between">
        <div className="w-full pr-4">
          <h2 className="text-black/10 dark:text-slate-100 text-2xl">Text</h2>
        <div className="min-h-96 p-6">
          <p className="w-full dark:text-white">{data?.text}</p>
        </div>
        </div>
        <div className="row-span-1">
          <h2 className="text-black/10 dark:text-slate-800 text-2xl">Invites</h2>
        <BentoBox colSpan="1" rowSpan="1" classes="min-h-96 p-6">
          <p className="dark:text-white">28 Invited</p>
          <small className="pb-4 text-white">13 going - 5 pending - 7 declined</small>
          { items.map((i) => (
          <div key={i} className="w-full h-10 bg-gray-300 flex flex-row justify-between items-center mb-2 pl-2">
            <h1 className="">name</h1>
            <div className="bg-aurora-900 rounded-xl p-2">
              ico
            </div>
          </div>
          ))}
          <button className="dark:bg-white dark:text-black text-sm rounded-md w-full h-8">
            manage invite
          </button>
        </BentoBox>
        </div>
      </div>
      <div className="pt-8 pl-12 pr-12">
        <h2 className="text-black/10 dark:text-slate-100 text-2xl">Feed</h2>        
        <div className="w-full flex items-center">
          <div className="flex-none">
          <div 
              style={{backgroundImage: `url(${session?.user.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}
              id="profile-image-container" className="h-12 w-12 bg-aurora-900 rounded-lg">
            </div>
          </div>
          <div className="flex-grow ml-2">
            <div className="text-black dark:text-white gap-4">
              <BentoBox colSpan="1" rowSpan="1" classes="w-">
                <div className="pl-2 pr-2 pt-4 pb-4">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="dark:text-white text-black w-full bg-transparent"/>
                </div>
            </BentoBox>
            </div>
          </div>
            <div className="flex-none pt-5">
            </div>
        </div>
        <button
          onClick={() => submitPost()} 
          className="flex bg-white shadow-md rounded-lg max-w-32 h-8 p-2 dark:text-black p-auto items-center">
              <span className="text-sm font-sm">post</span><ArrowRightIcon className="ml-3 dark:text-black w-4 h-4"/>
            </button>
        { !posts && <h2 className="text-2xl text-black dark:text-white">There are no Posts yet.</h2>}
        { posts?.slice().reverse().map((item) => (

        <div className="w-full flex items-center mt-6">
          <div className="flex-none">
            <UserProfileIcon id={item.creatorId} />
          </div>
          <div className="flex-grow ml-2">
            <div className="text-black dark:text-white">
              {item.creatorId}
              <BentoBox colSpan="1" rowSpan="1" >
                <div className="pt-4 pb-4 pl-3 pr-3">
                  <p className="dark:text-white text-black">{item.text}</p></div>
            </BentoBox>
                  <small className="text-gray-600">{item.createdAt.toString()}</small>
            </div>
          </div>
        </div>
      ))}
      </div>
      <div className="pt-8 pl-12 pr-12">
        <h2 className="text-black/10 dark:text-slate-800 text-2xl">Helping Hands</h2>
        <div className="max-h-[40%] border-b border-black/10 overflow-scroll">
          <TimeScaleColumns startTime={helpingHandsStartTime}/>
        </div>
      </div>
      <div className="absolute">
        <StarsBackground />
      </div>
    </div>
  )}