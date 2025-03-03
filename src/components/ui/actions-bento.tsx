'use client';
import { StarsBackground } from "../backgrounds/stars";
import { BentoBox } from "../elements/box";
import type { Session } from "next-auth";
import { UserProfileIcon } from "../elements/user-icon";
import Link from "next/link";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
type UserData = {
  image?: string;
  name?: string;
  handle?: string;
}
export const ActionsBento = ({ session } : { session: Session}) => {
  const [user, setUser] = useState<UserData>({});

  useEffect(() => {
    if(session.user) setUser(session.user as UserData);
  }, [session])

  const bentoClass = "flex rounded-lg border-2 flex-col bg-gray-200 dark:bg-slate-900 dark:border-white/10 border-opacity-60"
  return (
    <div className="relative flex flex-row items-center justify-between gap-4 pt-6 pb-0 h-screen bg-white dark:bg-black">
    <div className="relative z-10 flex flex-col md:grid h-full w-full gap-4 p-2 lg:grid-cols-2 lg:grid-rows-5 border-opacity-600">
      <div className="flex flex-col my-auto gap-6 ">
        <div className="flex flex-row w-full justify-start">
            <UserProfileIcon src={user.image} />
            <div className="flex-col pl-4 items-end">
              <p className="text-sm dark:text-gray-200">hey {user.handle ?? user.handle},</p>
              <p className="text-xl dark:text-white">{user.handle ?? 'nice to see you again!'}</p>
            </div>
        </div>
        { user.handle ?? (
          <BentoBox animated className="z-10">
          <div className="flex flex-row dark:text-white p-4 justify-between">
            <h2 className="p-2">Seems like you're new here, complete your Profile!</h2>
            <button 
              onClick={() => redirect('/profile/complete')}
              type="button" className="w-32 rounded-md font-semibold bg-aurora-900">
              lets go!
            
            </button>
          </div>  
          </BentoBox>
        )}
        <div>

        </div>
      </div>
      { user.handle && (
      <BentoBox colSpan="1" rowSpan="4" className="p-4" animated>
        <h2 className="dark:text-white text-2xl mb-4">Feed</h2>
        <div className="w-full h-full overflow-y-scroll border-b border-gray-400">

        <div className="flex flex-row items-center align-center">
          <p><u className="pr-1 text-aurora-900">@lxia</u>posted in <a className="pl-1 font-semibold">Woodgathering 2025</a>.</p>
        </div>
        <div className="flex flex-row items-center align-center">
          <p><u className="pr-1 text-aurora-900">&mstreue</u>posted 3 new <a className="pl-1">Happenings</a>.</p>
        </div>
        <div className="flex flex-row items-center align-center">
          <p>Its <u className="pr-1 pl-1 text-aurora-900">@shenaya_s</u>Birthday today.</p>
        </div>
        <div className="flex flex-row items-center align-center">
          <p><u className="pr-1 text-aurora-900">@bokcu</u>posted in <a className="pl-1 font-semibold">p.ara summer closing 2025</a>.</p>
        </div>
        <div className="flex flex-row items-center align-center">
          <p><u className="pr-1 text-aurora-900">@maikmaikmaikmaikmaik</u>joined <a className="pl-1 text-aurora-900">&para</a>.</p>
        </div>
        <div className="flex flex-row items-center align-center">
          <p><u className="pr-1 text-aurora-900">@bex_203</u>joined <a className="pl-1 font-semibold">Woodgathering 2025</a>.</p>
        </div>
        <div className="flex flex-row items-center align-center">
          <p><u className="pr-1 text-aurora-900">@margareten</u>joined <a className="pl-1 font-semibold">p.ara summer closing 2025</a>.</p>
        </div>
        </div>
        <small className="mt-1">view all</small>

      </BentoBox>
      )}
      <BentoBox colSpan="3" rowSpan="2" animated className="overflow-hidden min-h-48 bg-[url(/images/places-card-3.jpg)] bg-center bg-cover bg-no-repeat">
        <div className="w-full h-full p-4">
          <div className="absolute z-10">

        <a 
          href="/places"
          className="dark:text-white text-2xl mb-4">Discover Places
          </a>
        <p className="mt-3 text-slate-700">Currently there is 1 place on this site, you can check out!</p>
          </div>

        </div>
        <img src='' className="z-0 relative -translate-y-16"/> 

      </BentoBox>
      <BentoBox colSpan="1" rowSpan="2" animated className="overflow-hidden dark:hover:border-aurora-700 transition cursor-pointer bg-[url(/images/happeing-card-bg.png)] bg-top bg-cover bg-no-repeat">
       <Link href="/happen">
       <div className="h-14 p-4">

        <h2 className="dark:text-white text-2xl mb-4">Happenings</h2>
       </div>
        <div className="w-full min-h-32 h-full z-10">
          <p className="hidden md:flex dark:text-white p-4 text-justify">
            Create another Memory. Either Placebound, Private or Public. Invite people to your happening and manage helping hands! Chat about whatever is important with all attendees.
          </p>
        </div>
        </Link>
      </BentoBox>
      <div 
        className={`${bentoClass} col-span-1 p-6 row-span-3 hover:border-aurora-600`}
      >
        <p className="text-2xl dark:text-white">Place verwalten</p>
      </div>
    
      <div 
        className={`${bentoClass} col-span-1 row-span-2 p-6 hover:border-aurora-800`}
      >
        <p className="text-2xl dark:text-white">Freunde hinzufügen</p>
      </div>
    
      </div>
      <div className="absolute inset-0 z-0">
      <StarsBackground />
      </div>
    </div>
    )
}