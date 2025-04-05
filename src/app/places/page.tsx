import Alert from 'nglty/components/elements/alert';
import { PlacesComponent } from 'nglty/components/places/places';
import { auth } from 'nglty/server/auth';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {
    const session = await auth();
  return (
        <HydrateClient>
            <main className='min-h-screen'>
            <section className="pt-4">
              <Alert locationEnabled/>
        
              {session?.user.id && <PlacesComponent userId={session?.user.id}/>}
            </section>
            </main>
        </HydrateClient>
  );
}