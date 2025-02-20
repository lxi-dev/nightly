'use client';
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { StarsBackground } from "../backgrounds/stars";
import { BentoBox } from "../elements/box";
import type { User } from "next-auth";
import { UserProfileIcon } from "../elements/user-icon";
import { AurorasBackground } from "../backgrounds/auroras";
import Link from "next/link";

export const ActionsBento = ({ user } : { user: User}) => {

  const bentoClass = "flex rounded-lg border-2 flex-col bg-gray-200 dark:bg-slate-900 dark:border-white/10 border-opacity-60"
  return (
    <div className="relative flex flex-row items-center justify-between gap-4 pt-6 pl-12 pr-12 pb-0 h-screen bg-white dark:bg-black">
    <div className="relative z-10 flex flex-col md:grid h-full w-full gap-4 p-2 lg:grid-cols-3 lg:grid-rows-5 border-opacity-600">
    <BentoBox colSpan="1" rowSpan="1" animated classes="shadow-lg">
        <div className="flex flex-row md:flex-col">
          <div className="flex flex-row w-full justify-start">
            <div className="flex p-2">
              <UserProfileIcon id={user.id} />
            <div className="flex-col pl-4 items-end">
              <p className="text-sm dark:text-gray-200">hey</p>
              <p className="text-xl dark:text-white">{user.name}</p>
            </div>
            </div>
            <div className="flex-row -gap-2 pt-4 pr-4 float-right">
              <AcademicCapIcon className="text-aurora-900 w-6 h-6" />

            </div>
          </div>
          <div className="w-full h-full bg-gradient-to-b from-aurora-900/80 to-aurora-900 rounded-b-2xl">

          <div className="h-[2px] w-full bg-gray-200 dark:bg-slate-800"></div>
          <p className="text-xl text-white dark:text-white mb-4 mt-3 pl-3">Welcome back to nightly</p>
          </div>
          </div>
      </BentoBox>
      <BentoBox colSpan="2" rowSpan="1" classes="p-10" animated>
        <a 
          href="/places"
          className="text-2xl dark:text-white">Places entdecken
          </a>
      </BentoBox>
      <BentoBox colSpan="2" rowSpan="3" animated={true}>
        <div className="overflow-hidden relative rounded-3xl">
          <StarsBackground />
          <AurorasBackground />
        </div>
        <div className="absolute">
          <h2 className="dark:text-white p-6 text-2xl">Feed</h2>
        </div>
      {/* <p className="text-2xl dark:text-white">Feed</p>
      <div className="w-4 h-4 bg-aurora-200" />
      <div className="w-4 h-4 bg-aurora-300" />
      <div className="w-4 h-4 bg-aurora-400" />
      <div className="w-4 h-4 bg-aurora-500" />
      <div className="w-4 h-4 bg-aurora-600" />
      <div className="w-4 h-4 bg-aurora-700" />
      <div className="w-4 h-4 bg-aurora-800" />
      <div className="w-4 h-4 bg-aurora-900" />   */}
      </BentoBox>
      <BentoBox colSpan="1" rowSpan="2" animated classes="overflow-hidden dark:hover:border-aurora-700 transition cursor-pointer">
       <Link href="/happen">
       <div className="h-14 p-4 dark:bg-aurora-700">

        <p className="text-xl font-bold dark:text-white">Happenings</p>
       </div>
        <div className="w-full h-[1px] bg-white/40"></div>
        <div className="w-full h-full dark:bg-black/90 shadow-2xl z-10">
          <p className="dark:text-white p-4 text-justify">
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