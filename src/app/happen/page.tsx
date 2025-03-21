import { MapPin, Plus } from 'lucide-react';
import { HappeningsComponent } from 'nglty/components/happening/happenings';
import { Button } from 'nglty/components/ui/button';
import { auth } from 'nglty/server/auth';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {
const session = await auth();

  return (
        <HydrateClient>
            <main className='min-h-screen'>
            <section className="md:ml-12 md:mr-12 lg:mr-36 lg:ml-36 xl:mr-72 xl:mb-72 2xl:ml-128 2xl:mr-128">
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-6 mt-6">
                <Button className="gap-1 bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-700 transition-all duration-300 shadow-md hover:shadow-lg">
                    <Plus className="h-4 w-4" />
                    <span>Create Event</span>
                 </Button>

                <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted/50 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Bremen</span>
                    </div>
                </div>
            </div>
            {session?.user.id && <HappeningsComponent />}
        </section>
        </main>
    </HydrateClient>
  );
}