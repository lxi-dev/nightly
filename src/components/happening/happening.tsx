'use client';
import type { Happening, Post } from "@prisma/client";
import RelativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useState } from "react";
import { StarsBackground } from "../backgrounds/stars";
import { BentoBox } from "../elements/box";
import { CalendarDaysIcon, EyeIcon, EyeSlashIcon, HomeIcon } from "@heroicons/react/24/outline";
import { GoCommentDiscussion } from "react-icons/go";
import TimeScaleColumns from "./helping-hands";
import type { Session } from "next-auth";
import { api } from "nglty/trpc/react";
import { UserProfileIcon } from "../elements/user-icon";
import { HappeningStats } from "./happening-stats";

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
      {/* <div className={`relative z-10 grid`}> */}
  return (
    <main>
    <div className="relative flex flex-col h-full w-auto m-4">
      <div className={`flex flex-row w-full h-32 rounded-md justify-between items-end bg-${data.color} shadow-lg pb-4 lg:pl-6 lg:pr-6`}>
        <div className="flex flex-col justify-start items-start">
          <h5 className="dark:text-white/50 text-black/50">created by:{data?.creatorId.toString()}</h5>
          <h1 className={'flex text-md text-3xl text-white dark:text-white'}>{data?.name}</h1>
        </div>
        {/* Right Side */}
        <div className="flex flex-col justify-between items-end">
          <div className="absolute dark:text-black/30 text-white/30 overflow-hidden -translate-y-20">
            { data.type === 'placebound' && <HomeIcon className="w-[128px] h-[128px]"/>}
            { data.type === 'private' && <EyeSlashIcon className="w-[128px] h-[128px]"/>}
            { data.type === 'public' && <EyeIcon className="w-[128px] h-[128px]"/>}
          </div>
          <h4 className="relative text-white mb-2 dark:text-white">
            @ {data?.venue ?? data?.venue!.toString()}
          </h4>        
          { owner && 
            <button className="relative w-24 h-8 bg-white hover:shadow-lg hover:bg-gray-50 text-black dark:text-white rounded-md text-sm font-lg shadow-sm transition">
              edit
            </button>
          }
          </div>
        </div>
      <div className="flex flex-row justify-start items-center gap-10 border-t border-black/10 pl-2 pt-4">
        <p className="text-slate-500 text-1xl">created {timeFrom} </p>
        <CalendarDaysIcon className="w-4 h-4 text-slate-500"/>
        <p className="text-slate-500 text-1xl">happening {timeTo} </p>
      </div>
    </div>


      <div className="flex flex-col md:flex-row gap-2 justify-between m-4">
        <BentoBox animated className="w-full min-h-72 p-6 mr-2">
          <div className="w-full dark:text-white" dangerouslySetInnerHTML={{__html:data.text ?? ''}}></div>
        </BentoBox>
        <div className="flex flex-col gap-3">
          <HappeningStats active={!owner} id={data.id} userId={session?.user.id}/>
          { data.type === 'private' &&
          
        <BentoBox colSpan="1" rowSpan="1" className="min-h-96 p-6">
          <p className="dark:text-white">28 Invited</p>
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
          }
        </div>
      </div>

      {/** Feed */}
      <div className="pt-8 m-4">
        <h2 className="text-slate-600 dark:text-slate-100 text-2xl mb-1">Feed</h2>
        <p className="text-slate-500 text-sm">Got something to say? Contribute to the discussion in a <u>nice Way</u>.</p>
        <p className="text-slate-500 text-sm">Please also remember that your posts are public!</p>     
        <div className="w-full flex items-start pt-6">
          {!session?.user.handle && 
            <h2 className="text-1xl">Please create a handle to participate in discussions!</h2>
          }
          {session?.user.handle &&
            <section className="flex flex-row w-full md:w-1/2">
              <div className="flex-none pr-6">
                <UserProfileIcon src={session?.user.image}/>
                <small>{session?.user.handle}</small>
              </div>
              <div className="flex-grow ml-2">
                <BentoBox colSpan="1" rowSpan="1" className="text-black dark:text-white gap-4">
                  <div className="pl-2 pr-2 pt-4 pb-4 flex flex-row">
                    <textarea
                      placeholder="..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="dark:text-white text-black w-full bg-transparent pl-6"/>
                    <button
                      onClick={() => submitPost()} 
                      className="max-w-32 h-8 p-2 dark:text-black p-auto items-center">
                      <span className="text-sm font-sm"></span><GoCommentDiscussion className="ml-3 dark:text-black w-4 h-4 hover:text-aurora-900"/>
                    </button>
                  </div>
                </BentoBox>
              </div>
            </section>
          }
        </div>
        { session?.user.handle && 
        <section className="flex flex-col">
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
      </section>
    }
      </div>
      <div className="pt-8 pl-12 pr-12">
        <h2 className="text-black/10 dark:text-slate-800 text-2xl">Helping Hands</h2>
        <div className="max-h-[40%] border-b border-black/10 overflow-scroll">
          <TimeScaleColumns startTime={helpingHandsStartTime}/>
        </div>
      </div>
      <div className="absolute">
        <StarsBackground />
      {/* </div> */}
    </div>
    </main>
  )}