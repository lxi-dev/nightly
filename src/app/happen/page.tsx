import { PlusIcon } from 'lucide-react';
import Search from 'nglty/components/elements/search';
import { HappeningsComponent } from 'nglty/components/happening/happenings';
import { auth } from 'nglty/server/auth';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {
const session = await auth();

  return (
        <HydrateClient>
            <main className='min-h-screen'>
                <section className='lg:ml-12 lg:mr-12 2xl:ml-72 2xl:mr-72'>
                <div className="w-full">
                <div className="w-full flex flex-row items-center gap-2">
                    <a 
                        href='/happen/create'
                        className="dark:text-white">
                            <PlusIcon />
                        </a>
                <div className="w-full pl-8 flex justify-center">
                        <Search label="Suche nach Places" id='1' type="text"/>
                    </div>
                </div>
            {session?.user.id && <HappeningsComponent />}
        </div>
        </section>
        </main>
    </HydrateClient>
  );
}