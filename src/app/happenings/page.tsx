import { BigButton } from 'nglty/components/elements/big-button';
import { BentoBox } from 'nglty/components/elements/box';
import Search from 'nglty/components/elements/search';
import VaListItem from 'nglty/components/elements/va-list-item';
import { Header } from 'nglty/components/ui/header';
import { api, HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {
    const happenings = await api.happening.getHappeningsByUser();
  return (
        <HydrateClient>
            <main className='w-full'>
        
            <Header />
            <div className="flex flex-col items-center justify-between gap-4 pt-8 pl-12 pr-16 pb-0 bg-white dark:bg-black">
            <div className="w-full flex flex-row items-center gap-2">
                <BigButton 
                    redirect='/happenings/create'
                    backgroundImage='images/event-icon.jpg'/>
                <div className="w-full pl-8 flex justify-center">
                    <Search label="Suche nach Happenings" id='1' type="text" placeholder="" />
                </div>
            </div>
            <div className="grid h-31 w-full gap-4 grid-cols-2 grid-rows-1">
                <BentoBox colSpan="1" rowSpan="1" animated>
                    <p className="text-2xl dark:text-white p-6"><b>7</b> bevorstehende </p>
                </BentoBox>
                <BentoBox colSpan="1" rowSpan="1" animated>
                    <p className="text-2xl dark:text-white p-6  "><b>12</b> offene Einladungen</p>
                </BentoBox>
            </div>
            <div className="dark:bg-black h-screen w-full">
            { happenings.map((happening, i) => <VaListItem key={i} happeningStatus={happening.type} happeningName={happening.name} happeningVenue={happening.venue} happeningStart={happening.dateHappening?.toString() ?? ''} />) }
            </div>
        </div>
        </main>
    </HydrateClient>
  );
}