import { HappeningsActionBar } from 'nglty/components/happening/actionbar';
import { HappeningsComponent } from 'nglty/components/happening/happenings';
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
            <HappeningsActionBar />
            {session?.user.id && <HappeningsComponent/>}
        </section>
        </main>
    </HydrateClient>
  );
}