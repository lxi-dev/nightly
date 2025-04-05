/* eslint-disable */
'use client';
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { EyeIcon, EyeSlashIcon, HomeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { BentoBox } from "../elements/box";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
import { api } from "nglty/trpc/react";
import GenericNotification from "../elements/notification-pills/generic";

type VaListItemProps = {
  happeningId: string,
  happeningStatus: string,
  happeningName: string,
  happeningVenue: string,
  happeningStart: string,
  venueId?: string,
  color: string
  onDelete?: Function;
}

const VaListItem: React.FC<VaListItemProps> = ({ happeningId, happeningStatus, happeningName, happeningVenue, happeningStart, color, onDelete, venueId }) => {
  const { data } = api.places.getSimplePlace.useQuery({id: venueId!}, { enabled: !!venueId});
  const [ venuePicture, setVenuePicture] = useState<string | undefined>(undefined);
  useEffect(() => {
    if(!data) return;
    setVenuePicture(data.picture);
  }, [data])
  
  const va = {
    id: happeningId,
    status: happeningStatus,
    data: {
      config: {
        name: happeningName,
        venue: happeningVenue,
        startTime: happeningStart,
        startDay: dayjs(happeningStart).format('DD'),
        startWeekday: dayjs(happeningStart).format('MMM'),
        color: color,
      },
    borderColor: `bg-${color}`
    },
  };
  const categoryColors: {[key:string]: string} = {
    education: "from-blue-600 to-cyan-600",
    concert: "from-purple-600 to-pink-600",
    club: "from-amber-600 to-orange-600",
    social: "from-green-600 to-emerald-600",
    sports: "from-slate-600 to-gray-600",
    tech: "from-blue-600 to-emerald-600",
    art: "from-slate-600 to-cyan-600",
    business: "from-slate-600 to-orange-600",
    aurora: 'from-aurora to-aurora',
    'aurora-900': 'from-aurora-900 to-aurora-900',
    'aurora-400': 'from-violet-300 to-violet-600',
    'red': 'from-red-300 to-red-600'
  }
    
  const gradientClass: string | undefined = va.data.config.color ? categoryColors[va.data.config.color] : "from-aurora to-aurora-900"

return(
  <BentoBox className="shadow-sm">
    <div className="w-full p-4 flex items-center justify-between duration-50 cursor-pointer transition">
    <div 
      className="flex flex-row text-left w-[70%]"
      onClick={() => redirect(`/happen/h/${happeningId}`)}
    >
      <div className="flex flex-col w-16 items-center pt-2 mr-4">
        <p className="text-2xl">{va.data.config.startDay}</p>
        <p className="font-bold text-xs">{va.data.config.startWeekday.toUpperCase()}</p>
      </div>
      <div className={`h-16 w-[5px] bg-gradient-to-b ${gradientClass} rounded-sm`}></div>
      <div className={`flex flex-col items-start h-16 pl-4 w-72 pt-1`}>
        <h2 className={`text-sm lg:text-xl text-left`}>{va.data.config.name}</h2>
          {(!venueId && va.data.config.venue )&&
        <div className="flex flex-row items-left">
          
        <MapPinIcon className="h-4 w-4"/>
          <h5 className='text-xs lg:text-sm ml-2 max-w-45 overflow-hidden text-ellipsis'>{va.data.config.venue}</h5>
          
        </div>
          }
          <div className="mt-1">
        <GenericNotification text={va.data.config.color} />
          </div>
      </div>
    </div>
    <div className='flex'>
      <div className="flex flex-col min-w-32 justify-end items-end">
      {onDelete !== undefined && <Button onClick={(e) => onDelete(va.id)}><TrashIcon /></Button>}
      <div className="flex flex-row items-center pb-2">
          
          { va.status === 'placebound' && 
            <div className="w-32 h-14 bg-violet-300 rounded-xl">
              {venuePicture && <img className="h-20 rounded-xl border md:border-2 border-gray-300 dark:border-gray-700" src={venuePicture} />}
            </div>}
          { va.status === 'private' && <EyeSlashIcon className="w-[14px] h-[14px] mr-2"/>}
          { va.status === 'public' && <span><EyeIcon className="w-[14px] h-[14px] mr-2"/>{ va.status }</span>}
          
          </div>
      {/*<TimeNotification startTime={va.data.config!.startTime}/> */}
      </div>
    </div>
  </div>
  </BentoBox>
);
}

export default VaListItem;