import { BigButton } from 'nglty/components/elements/big-button';
import { BentoBox } from 'nglty/components/elements/box';
import Search from 'nglty/components/elements/search';
import { Header } from 'nglty/components/ui/header';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {

  return (
        <HydrateClient>
            <main className='h-screen'>
        
            <Header />
            <div className="flex flex-col items-center justify-between gap-4 pt-12 pl-12 pr-12 pb-0 h-screen bg-white dark:bg-black">
                <div className="w-full">
                <div className="w-full flex flex-row items-center gap-2">
                <BigButton 
                    redirect='/places/create'
                    backgroundImage='images/place-icon.jpg'/>
                <div className="w-full pl-8 flex justify-center">
                    <Search label="Suche nach Places" id='1' type="text" placeholder="" />
                </div>
            </div>
                    <BentoBox colSpan="1" rowSpan="1">
                        <div className="flex flex-row items-center justify-between gap-4">
                        <div className="shadow-aurora-600 shadow-sm w-20 h-20 rounded-md flex items-center justify-center">
                            <p className="text-2xl dark:text-white">Mein Ort</p>
                            </div>
                            
                        <div className="w-full pr-2">
                        <input type="text" placeholder="Suche nach Orten" className="w-full h-10 px-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-blue-500" />
                        </div>
                    </div>
                    </BentoBox>
                </div>
                <div className="grid h-full w-full gap-4 p-2 grid-cols-4 grid-rows-5">
                    {/* <BentoBox colSpan="1" rowSpan="5">
                        <p className="text-2xl dark:text-white">235</p>
                        <p className="text-2xl dark:text-white">Friends</p>
                    </BentoBox> */}
                    <BentoBox colSpan="2" rowSpan="4">
                        <p className="text-2xl dark:text-white">Places entdecken - hier karte anzeigen</p>
                    </BentoBox>
                    <BentoBox colSpan="2" rowSpan="4">
                        <p className="text-2xl dark:text-white">Feed - hier feed anzeigen</p>
                    </BentoBox>
                </div>
                </div>
            </main>
        </HydrateClient>
  );
}