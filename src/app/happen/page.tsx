import { BigButton } from 'nglty/components/elements/big-button';
import Search from 'nglty/components/elements/search';
import VaListItem from 'nglty/components/elements/va-list-item';
import { Header } from 'nglty/components/ui/header';
import { api, HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {
    const happenings = await api.happening.getHappeningsByUser();
    const publicHappenings = await api.happening.getAllPublic();

  return (
        <HydrateClient>
            <main className='w-full dark:bg-black'>
            <Header />
            <div className="lg:ml-12 lg:mr-12 p-4">
            <div className="w-full flex flex-row items-center gap-2">
                <BigButton 
                    redirect='/happen/create'
                    backgroundImage='images/event-icon.jpg'/>
                <div className="w-full pl-8 flex justify-center">
                    <Search label="Suche nach Happenings" id='1' type="text" placeholder="" />
                </div>
            </div>
            <div className="grid h-31 w-full gap-4 grid-cols-3 grid-rows-1">
                {/* <BentoBox colSpan="3" rowSpan="1" animated>
                    <p className="text-2xl dark:text-white p-6"><b>{publicHappenings.length}</b> public Happenings</p>
                </BentoBox> */}
            </div>
            <div className="w-full h-full mb-12 mt-4">
            <div className="w-full">
                <h2 className="text-2xl dark:text-white/50 text-black/50">Public Happenings</h2>
            { publicHappenings.map((happening, i) => <VaListItem happeningId={happening.id} key={i} happeningStatus={happening.type} happeningName={happening.name} happeningVenue={happening.venue} happeningStart={happening.dateHappening?.toString() ?? ''} color={happening.color} />) }
            </div>
            <div className="w-full mt-6">
                <h2 className="text-2xl dark:text-white/50 text-black/50">Your Happenings</h2>
            { happenings.map((happening, i) => <VaListItem happeningId={happening.id} key={i} happeningStatus={happening.type} happeningName={happening.name} happeningVenue={happening.venue} happeningStart={happening.dateHappening?.toString() ?? ''} color={happening.color}/>) }
            </div>
            </div>
        </div>
        </main>
    </HydrateClient>
  );
}