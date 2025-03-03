import { Header } from 'nglty/components/ui/header';
import { SignUpFunnel } from 'nglty/components/ui/signUpFunnel';
import { auth } from 'nglty/server/auth';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {
  
  const session = await auth();
  
  return (
        <HydrateClient>
            <main className='w-full h-screen dark:bg-black'>
            <Header />
            <div className="flex flex-col h-full items-center justify-between lg:ml-12 lg:mr-12">
                <SignUpFunnel user={session!.user} />
            </div>
        </main>
    </HydrateClient>
  );
}