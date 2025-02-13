import { BentoBox } from 'nglty/components/elements/box';
import Search from 'nglty/components/elements/search';
import VaListItem from 'nglty/components/elements/va-list-item';
import { Header } from 'nglty/components/ui/header';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {

  return (
        <HydrateClient>
            <main className='w-full'>
        
            <Header />
            <div className="flex flex-col items-center justify-between gap-4 pt-12 pl-12 pr-12 pb-0 bg-white dark:bg-black">
            <div className="w-full flex flex-row items-center gap-2">
                <div className="shadow-aurora-600 shadow-sm w-20 h-20 rounded-md flex items-center justify-center">
                            <p className="text-2xl dark:text-white">Event erstellen</p>
                            </div>
                            
                        <div className="w-full pl-8 flex justify-center">
                            <Search label="Suche nach Orten" id='1' type="text" placeholder="" />
                        </div>
                    </div>
                <div className="grid h-31 w-full gap-4 grid-cols-2 grid-rows-1">
                    <BentoBox colSpan="1" rowSpan="1">
                        <p className="text-2xl dark:text-white">235</p>
                        <p className="text-2xl dark:text-white">Friends</p>
                    </BentoBox>
                    <BentoBox colSpan="1" rowSpan="1">
                        <p className="text-2xl dark:text-white">Places entdecken</p>
                    </BentoBox>
                </div>
                { Array(10).fill(0).map((_, i) => <VaListItem key={i} />) }
                </div>
            </main>
        </HydrateClient>
  );
}