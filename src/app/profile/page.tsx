import { BentoBox } from 'nglty/components/elements/box';
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

                <BentoBox colSpan="4" rowSpan="5">
                    <p className="text-2xl dark:text-white">User data</p>
                </BentoBox>
                <BentoBox colSpan="4" rowSpan="5">
                    <p className="text-2xl dark:text-white">Display places User is in</p>
                </BentoBox>
                <BentoBox colSpan="4" rowSpan="5">
                    <p className="text-2xl dark:text-white">Display events User is in</p>
                </BentoBox>
                </div>
                <div className="grid h-full w-full gap-4 p-2 grid-cols-4 grid-rows-5">
                    {/* <BentoBox colSpan="1" rowSpan="5">
                        <p className="text-2xl dark:text-white">235</p>
                        <p className="text-2xl dark:text-white">Friends</p>
                    </BentoBox> */}
                    <BentoBox colSpan="2" rowSpan="4">
                        <p className="text-2xl dark:text-white">Places entdecken</p>
                    </BentoBox>
                    <BentoBox colSpan="2" rowSpan="4">
                        <p className="text-2xl dark:text-white">Feed</p>
                    </BentoBox>
                </div>
                </div>
            </main>
        </HydrateClient>
  );
}