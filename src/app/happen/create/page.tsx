import HappeningFunnel from 'nglty/components/elements/forms/create/create-happening';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {
    //const session = await auth();
  return (
        <HydrateClient>
            <main className='w-full'>
            <div className="md:ml-12 md:mr-12 lg:mr-36 lg:ml-36 xl:mr-72 xl:mb-72 2xl:ml-128 2xl:mr-128">
            <HappeningFunnel />
            </div>
        </main>
    </HydrateClient>
  );
}