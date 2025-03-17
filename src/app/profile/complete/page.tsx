import UserCompleteFunnel from 'nglty/components/elements/forms/create/create-user';
import { auth } from 'nglty/server/auth';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {
  
  const session = await auth();
  
  return (
        <HydrateClient>
            <main className='w-full h-screen'>
            <div className="flex flex-col h-full items-center justify-between md:ml-12 md:mr-12 lg:mr-36 lg:ml-36 xl:mr-72 xl:mb-72 2xl:ml-128 2xl:mr-128">
                <UserCompleteFunnel user={session!.user}/>
            </div>
        </main>
    </HydrateClient>
  );
}