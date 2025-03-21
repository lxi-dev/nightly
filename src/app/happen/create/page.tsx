import HappeningFunnel from 'nglty/components/elements/forms/create/create-happening';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {
    //const session = await auth();
  return (
        <HydrateClient>
            <main className='w-full'>
            <div>
            <HappeningFunnel />
            </div>
        </main>
    </HydrateClient>
  );
}