import CreatePlaceFunnel from 'nglty/components/elements/forms/create/create-place';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {
    //const session = await auth();
  return (
        <HydrateClient>
            <main className='w-full min-h-screen'>
            <section className='lg:ml-12 lg:mr-12 2xl:ml-72 2xl:mr-72'>
                <CreatePlaceFunnel />
            </section>
        </main>
    </HydrateClient>
  );
}