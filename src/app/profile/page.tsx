import { BentoBox } from 'nglty/components/elements/box';
import { UsersList } from 'nglty/components/users/all-users';
import { ProfileCard } from 'nglty/components/users/profile-card';
import { auth } from 'nglty/server/auth';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {
    const session = await auth();

  return (
        <HydrateClient>
            <main className='h-screen'>
        
            <div className="flex flex-col items-center justify-between gap-4">
                <div className="w-full dark:text-white">
                <BentoBox colSpan="4" rowSpan="5" className="shadow-lg" animated>
                    <ProfileCard profile={session!} />
                </BentoBox>

                    <p className="text-2xl dark:text-slate-700 mt-8">All Users on Nightly</p>
                <BentoBox colSpan="4" rowSpan="5" className="mt-2">
                { session?.user.handle && <UsersList />}
                </BentoBox>
                <BentoBox colSpan="4" rowSpan="5" className="mt-2">
                    <p className="text-2xl dark:text-white">Display places User is in</p>
                    <p className="text-2xl dark:text-white">Display Happenings a User is participating in</p>
                </BentoBox>
                </div>
                <div className="grid h-full w-full gap-4 p-2 grid-cols-4 grid-rows-5">
                    {/* <BentoBox colSpan="1" rowSpan="5">
                        <p className="text-2xl dark:text-white">235</p>
                        <p className="text-2xl dark:text-white">Friends</p>
                    </BentoBox> */}
                </div>
                </div>
            </main>
        </HydrateClient>
  );
}