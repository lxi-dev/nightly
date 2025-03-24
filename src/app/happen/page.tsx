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
            <section>
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-6 mt-6">
                <a href="happen/create">
                <Button className="gap-1 bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-700 transition-all duration-300 shadow-md hover:shadow-lg dark:text-white">
                    <Plus className="h-4 w-4" />
                    <span>Create Event</span>
                 </Button>
                 </a>
                <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted/50 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Bremen</span>
                    </div>
                </div>
            </div>
            {session?.user.id && <HappeningsComponent/>}
        </section>
        </main>
    </HydrateClient>
  );
}