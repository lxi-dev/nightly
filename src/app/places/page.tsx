import { Compass } from 'lucide-react';
import { PlacesComponent } from 'nglty/components/places/places';
import { Button } from 'nglty/components/ui/button';
import { auth } from 'nglty/server/auth';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {
    const session = await auth();

  return (
        <HydrateClient>
            <main className='min-h-screen'>
            <section className="md:ml-12 md:mr-12 lg:mr-36 lg:ml-36 xl:mr-72 xl:mb-72 2xl:ml-128 2xl:mr-128 pt-4">
        {/* Location Alert */}
        <div className="mb-6 flex items-center justify-between rounded-lg bg-gradient-to-r from-violet-50 via-fuchsia-50 to-violet-50 p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
              <Compass className="h-4 w-4" />
            </div>
            <div className="text-sm">
              Exploring places near <span className="font-medium">Bremen</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-xs">
            Change
          </Button>
        </div>

              {session?.user.id && <PlacesComponent userId={session?.user.id}/>}
            </section>
            </main>
        </HydrateClient>
  );
}