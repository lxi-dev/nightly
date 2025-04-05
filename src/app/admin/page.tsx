import { BentoBox } from 'nglty/components/elements/box';
import { AdminPlacesList } from 'nglty/components/places/admin-places-list';
import { UsersList } from 'nglty/components/users/all-users';
import { auth } from 'nglty/server/auth';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {
    const session = await auth();

    const admin = session?.user.role === 'admin';

    if (!admin) return;
    return (
            <HydrateClient>
                <div className="h-screen flex flex-col items-center justify-between gap-4">
                    <div className="w-full dark:text-white">
                        <p className="text-2xl dark:text-slate-700 mt-8">All Users on Nightly</p>
                    <BentoBox colSpan="4" rowSpan="5" className="mt-2">
                        <UsersList />
                    </BentoBox>
                    <p className="text-2xl dark:text-slate-700 mt-8">All Places / Groups on Nightly</p>

                    <BentoBox animated>
                        <AdminPlacesList />
                    </BentoBox>

                    </div>
                </div>
            </HydrateClient>
  );
}