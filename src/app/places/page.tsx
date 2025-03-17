import Search from 'nglty/components/elements/search';
import { PlacesComponent } from 'nglty/components/places/places';
import { auth } from 'nglty/server/auth';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {
    const session = await auth();

  return (
        <HydrateClient>
            <main className='min-h-screen'>
        
            <section className="md:ml-12 md:mr-12 lg:mr-36 lg:ml-36 xl:mr-72 xl:mb-72 2xl:ml-128 2xl:mr-128">
            <div className="flex flex-col items-center justify-between gap-4">
            <div className="w-full">
            <div className="w-full flex flex-row items-center gap-2">
                    <Search label="Suche nach Places" id='1' type="text"/>
            </div>
            {session?.user.id && <PlacesComponent userId={session?.user.id}/>}
            </div>
            </div>
            </section>
            </main>
        </HydrateClient>
  );
}