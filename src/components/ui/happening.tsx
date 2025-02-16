'use client';
import type { Happening } from "@prisma/client";
import RelativeTime from "dayjs/plugin/relativeTime";

import dayjs from "dayjs";
import { useState } from "react";
import { StarsBackground } from "../backgrounds/stars";
import { BentoBox } from "../elements/box";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import TimeScaleColumns from "./helping-hands";

export const HappeningView = ({ data } : { data: Happening}) => {
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

    //const creatorImage = api.users.getUserIconById({ id });
    const items = [1, 2, 3, 4, 5]; // Example array


  // const bentoClass = "flex rounded-lg border-2 flex-col bg-gray-200 dark:bg-slate-900 dark:border-white/10 border-opacity-60"
  return (
    <div className="relative flex flex-col gap-4 pb-0 h-screen bg-white dark:bg-black">
    <div className={`relative z-10 grid`}>
      <div className={`flex flex-row w-full h-32 justify-between items-end bg-${data.color} shadow-lg pb-4 pl-12 pr-12`}>
      <div className="flex flex-col justify-start items-start">
        <h5 className="dark:text-white/50 text-black/50">created by:{data?.creatorId.toString()}</h5>
        <h1 className={'flex text-md text-3xl text-white dark:text-white'}>{data?.name}</h1>

      </div>
        <h4 className="text-white dark:text-white">{data?.venue.toString()}</h4>
      </div>
      <div className="flex flex-row justify-start items-center w-full gap-4 border-t border-black/10 pl-12 pt-4">
        <p className="text-slate-500 text-1xl">created {timeFrom} </p>
        <CalendarDaysIcon className="w-4 h-4 text-slate-500"/>
        <p className="text-slate-500 text-1xl">happening {timeTo} </p>
      </div>
    </div>
      <div className="flex flex-rows gap-2 pl-12 pr-12">
        <div className="row-span-1 min-w-[70%]">
          <h2 className="text-black/10 dark:text-white/10 text-2xl">Text</h2>
        <BentoBox colSpan="1" rowSpan="1" classes="min-h-96 p-6">
          <p className="dark:text-white">{data?.text}</p>
        </BentoBox>

        </div>
        <div className="row-span-1">
          <h2 className="text-black/10 dark:text-white/10 text-2xl">Invites</h2>
        <BentoBox colSpan="1" rowSpan="1" classes="min-h-96 p-6">
          <p className="dark:text-white">28 Invited</p>
          <small className="pb-4">13 going - 5 pending - 7 declined</small>
          { items.map((i) => (
          <div key={i} className="min-w-96 h-10 bg-gray-300 flex flex-row justify-between items-center mb-2 pl-2">
            <h1 className="">name</h1>
            <div className="bg-aurora-900 rounded-xl p-2">
              ico
            </div>
          </div>
          ))}
        </BentoBox>
        </div>
      </div>
      <div className="pt-8 pl-12">
        <h2 className="text-black/10 dark:text-white/10 text-2xl">Helping Hands</h2>
        <div className="max-h-[40%] border-b border-black/10 overflow-scroll">
          <TimeScaleColumns />
        </div>
      </div>
      <div className="absolute">
        <StarsBackground />
      </div>
    </div>
  )}