'use client';
import type { Happening } from "@prisma/client";
import RelativeTime from "dayjs/plugin/relativeTime";

import dayjs from "dayjs";
import { useState } from "react";
import { StarsBackground } from "../backgrounds/stars";

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

  // const bentoClass = "flex rounded-lg border-2 flex-col bg-gray-200 dark:bg-slate-900 dark:border-white/10 border-opacity-60"
  return (
    <div className="relative flex flex-row items-center justify-between gap-4 pt-6 pl-12 pr-12 pb-0 h-screen bg-white dark:bg-black">
    <div className="relative z-10 grid h-full p-2">
            <h1 className={'flex text-md text-3xl text-white'}>{data?.name}</h1>
            <h5 className="text-white">created by:{data?.creatorId.toString()}</h5>
            <div className="flex flex-col w-full">
                <p className="text-slate-500 text-1xl">created {timeFrom} </p>
                </div>
            <div className="flex flex-col w-full">
                <p className="text-slate-500 text-1xl">happening {timeTo} </p>
            </div>
    
    
      <h4 className="text-white">{data?.venue.toString()}</h4>
      <p className="text-white">{data?.text}</p>
      </div>
      <div className="absolute">
        <StarsBackground />
      </div>
    </div>
  )}