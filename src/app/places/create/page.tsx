import CreatePlaceFunnel from 'nglty/components/elements/forms/create/create-place';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {
    //const session = await auth();
  return (
        <HydrateClient>
            <main className='w-full min-h-screen'>
            <section>
                <CreatePlaceFunnel />
            </section>
        </main>
    </HydrateClient>
  );
}