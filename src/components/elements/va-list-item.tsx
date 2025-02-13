/* eslint-disable */
'use client';
import React from "react";
import { redirect } from "next/navigation";
import TimeNotification from "./notification-pills/time";


const VaListItem: React.FC = ({ }) => {
  const va = {
    id: 1,
    status: "public",
    data: {
      config: {
        name: "Test",
        venue: "Venue",
        startTime: "2023-01-01T00:00:00.000Z",
        endTime: "2023-01-01T00:00:00.000Z",
      },
    },
  };
    const delteVa = async () => {};
    const handleClick = (id: number) => () => {
        redirect(`/dashboard/schichtplan/${id}`);
      }

    // const deleteListItem = async () => {
    //     console.log('delete list item');
    //     const rsp = await deleteVa(va.id!.toString());
    //     console.log(rsp);
    //     if (rsp.success) {
    //         toast({
    //             title: "Va wurde gelöscht",
    //             description: "Der Veranstaltungsort wurde erfolgreich gelöscht",
    //         })
    //         redirect('/dashboard/schichtplan');
    //     } else {
    //         toast({
    //             title: "Fehler beim Löschen",
    //             description: "Bitte überprüfe deine Eingaben",
    //         })
    //     }
    // }

    const clipJoinLink = async () => {
        console.log('clip join link');
        navigator.clipboard.writeText(`https://localhost:3000/dashboard/schichtplan/${va.id}?signup=InsertVALink}`);
    }

    const openInJoinMode = async () => {
        console.log('open in join mode');
        redirect(`/dashboard/schichtplan/${va.id}?signup=InsertVALink`);
    }

return(
    <div className="w-full pl-3 pt-3 pb-3 bg-gray-100 rounded-lg border-b-1 hover:bg-violet-200 border-white mt-2 flex items-center justify-between duration-50 cursor-pointer">
    <div 
      className="flex flex-row text-left w-[70%]"
      onClick={handleClick(1)}
>
      <span className="p-2 mt-2 mr-3">
          { va.status === 'private' && <svg width="14px" height="14px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M19.5 16L17.0248 12.6038" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17.5V14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.5 16L6.96895 12.6124" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 8C6.6 16 17.4 16 21 8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>}
          { va.status === 'public' && <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000" strokeWidth="1.5"><path d="M3 13C6.6 5 17.4 5 21 13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z" fill="#000000" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>}   
        </span>
      <div className="flex flex-col flex-end text-left">
        <h2 className={`text-center text-lg`}>{va.data.config.name}</h2>
        <h5 className='text-left text-xs'>{va.data.config.venue}</h5>
      </div>
    </div>
    <div className='flex'>
      <div className="flex flex-row flex-end text-right">
      <TimeNotification startTime={va.data.config!.startTime}/>
      </div>
    </div>
  </div>
);
}

export default VaListItem;