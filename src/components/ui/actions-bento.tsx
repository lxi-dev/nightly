'use client';
import { StarsBackground } from "../backgrounds/stars";
import { BentoBox } from "../elements/box";
import type { User } from "next-auth";

export const ActionsBento = ({ user } : { user: User}) => {

  const bentoClass = "flex rounded-lg border-2 flex-col bg-gray-200 dark:bg-slate-900 dark:border-white/10 border-opacity-60"
  return (
    <div className="relative flex flex-row items-center justify-between gap-4 pt-6 pl-12 pr-12 pb-0 h-screen bg-white dark:bg-black">
    <div className="relative z-10 grid h-full w-full gap-8 p-2 grid-cols-3 grid-rows-5 border-opacity-600">
      <BentoBox colSpan="1" rowSpan="1">
        <div className="flex flex-col justify-start">
          <div 
            style={{backgroundImage: `url(${user.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}
            id="profile-image-container" className="w-full h-10 bg-black">
          </div>

          <div className="pl-5 pt-3 pb-3">
          <p className="text-sm dark:text-white">hey</p>
          <p className="text-xl dark:text-white">{user?.name}</p>
          {user.image}
        </div>
        </div>

      </BentoBox>
      <BentoBox colSpan="2" rowSpan="1" classes="p-10">
        <a 
          href="/places"
          className="text-2xl dark:text-white">Places entdecken
          </a>
      </BentoBox>
      <BentoBox colSpan="2" rowSpan="3">
      <p className="text-2xl dark:text-white">Feed</p>
      <div className="w-4 h-4 bg-aurora-200" />
      <div className="w-4 h-4 bg-aurora-300" />
      <div className="w-4 h-4 bg-aurora-400" />
      <div className="w-4 h-4 bg-aurora-500" />
      <div className="w-4 h-4 bg-aurora-600" />
      <div className="w-4 h-4 bg-aurora-700" />
      <div className="w-4 h-4 bg-aurora-800" />
      <div className="w-4 h-4 bg-aurora-900" />  
      </BentoBox>
      <BentoBox colSpan="1" rowSpan="2" animated classes="overflow-hidden dark:hover:border-aurora-700 transition cursor-pointer">
       <div className="h-14 p-4 dark:bg-aurora-700">

        <p className="text-xl font-bold dark:text-white">Happenings</p>
       </div>
        <div className="w-full h-[1px] bg-white/40"></div>
        <div className="w-full h-full dark:bg-black/90 shadow-2xl z-10">
          <p className="dark:text-white p-4 text-justify">
            Create another Memory. Either Placebound, Private or Public. Invite people to your happening and manage helping hands! Chat about whatever is important with all attendees.
          </p>
        </div>
      </BentoBox>
      <div 
        className={`${bentoClass} col-span-1 p-6 row-span-3 hover:border-aurora-600`}
      >
        <p className="text-2xl dark:text-white">Place verwalten</p>
      </div>
    
      <div 
        className={`${bentoClass} col-span-2 row-span-2 p-6 hover:border-aurora-800`}
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