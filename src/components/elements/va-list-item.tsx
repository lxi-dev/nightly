/* eslint-disable */
'use client';
import React from "react";
import { redirect } from "next/navigation";
import TimeNotification from "./notification-pills/time";
import { EyeIcon, EyeSlashIcon, HomeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";

type VaListItemProps = {
  happeningId: string,
  happeningStatus: string,
  happeningName: string,
  happeningVenue: string,
  happeningStart: string,
  color: string
}
const VaListItem: React.FC<VaListItemProps> = ({ happeningId, happeningStatus, happeningName, happeningVenue, happeningStart, color }) => {
  const va = {
    id: happeningId,
    status: happeningStatus,
    data: {
      config: {
        name: happeningName,
        venue: happeningVenue,
        startTime: happeningStart,
        startDay: dayjs(happeningStart).format('DD'),
        startWeekday: dayjs(happeningStart).format('ddd'),
        color: color,
      },
    borderColor: `bg-${color}`
    },
  };
    const handleClick = (id: string) => () => {
        redirect(`happen/h/${id}`);
      }

return(
    <div className="w-full p-4 bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-700 dark:text-white rounded-md border-b-1 hover:shadow-md dark:border-white mb-2 flex items-center justify-between duration-50 cursor-pointer transition">
    <div 
      className="flex flex-row text-left w-[70%]"
      onClick={handleClick(happeningId ?? '')}
    >
      <div className="flex flex-col w-16 items-center pt-2 mr-4">
        <p className="text-2xl">{va.data.config.startDay}</p>
        <p className="font-bold text-xs">{va.data.config.startWeekday.toUpperCase()}</p>
      </div>
      <div className={`h-16 w-[5px] ${va.data.borderColor} rounded-sm`}></div>
      <div className={`flex flex-col items-start h-16 pl-4 w-72 pt-1 pb-2 `}>
        <h2 className={`text-sm lg:text-xl text-left`}>{va.data.config.name}</h2>
        <div className="flex flex-row items-left pt-2">
        <MapPinIcon className="h-4 w-4"/>
          <h5 className='text-xs lg:text-sm ml-2 max-w-45 overflow-hidden text-ellipsis'>{va.data.config.venue}</h5>
      </div>
      </div>
    </div>
    <div className='flex'>
      <div className="flex flex-col min-w-32 justify-end items-end">

      <div className="flex flex-row items-center pb-2">
          
          { va.status === 'placebound' && <HomeIcon className="w-[14px] h-[14px] mr-2"/>}
          { va.status === 'private' && <EyeSlashIcon className="w-[14px] h-[14px] mr-2"/>}
          { va.status === 'public' && <EyeIcon className="w-[14px] h-[14px] mr-2"/>}
           { va.status } event
          </div>
      {/*<TimeNotification startTime={va.data.config!.startTime}/> */}
      </div>
    </div>
  </div>
);
}

export default VaListItem;