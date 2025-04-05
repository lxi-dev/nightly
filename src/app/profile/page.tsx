import { Power } from 'lucide-react';
import Link from 'next/link';
import { BentoBox } from 'nglty/components/elements/box';
import { ProfileCard } from 'nglty/components/users/profile-card';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

export default async function Page() {

  return (
        <HydrateClient>
            <main className='h-screen'>
        
            <div className="flex flex-col items-center justify-between gap-4 pt-4">
                <div className="w-full dark:text-white">
                <BentoBox colSpan="4" rowSpan="5" className="shadow-lg" animated>
                    <ProfileCard />
                </BentoBox>
                <Link
                href={"/api/auth/signout"}
                className="flex flex-wrap items-center w-full justify-center flex flex-col bg-white overflow-hidden w-10 h-10 border-slate-700 shadow-sm rounded-md hover:bg-violet-300 pt-3 pb-3 text-sm font-medium hover:text-gray-100">
                <div className="flex flex-row items-center gap-4 ">
                <Power className="w-4 h-4"/> Sign Out
                </div>
            </Link>
                </div>
                </div>
            </main>
        </HydrateClient>
  );
}