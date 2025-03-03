import CreatePlaceFunnel from 'nglty/components/elements/forms/create-place';
import { Header } from 'nglty/components/ui/header';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {
    //const session = await auth();
  return (
        <HydrateClient>
            <main className='w-full'>
            <Header />
            <div className="flex flex-col items-center justify-between gap-4 pt-6 pl-16 pr-16 pb-0 bg-white dark:bg-black">
                <CreatePlaceFunnel />
            </div>
        </main>
    </HydrateClient>
  );
}