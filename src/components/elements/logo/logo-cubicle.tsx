/* eslint-disable */

'use client';
import { Major_Mono_Display } from "next/font/google";
import { redirect } from "next/navigation";
import { StarsBackground } from "nglty/components/backgrounds/stars";

const majormono = Major_Mono_Display({
    weight: '400',
    subsets: ['latin']
});

export default function LogoCubicle() {
  return (
    <div 
      className="flex flex-col bg-black overflow-hidden w-10 h-10 border-slate-700 shadow-sm rounded-md relative" 
      onClick={() => redirect('/')} 
    >
      <div className="absolute inset-0 z-0">
        <StarsBackground starDensity={1}/>
        </div>
        <div className="flex grow flex-row w-6 justify-start space-x-2 pl-1 pb-.5 relative z-10">
          <div className={`${majormono.className} flex flex-row items-center leading-none text-white tracking-tighter`}>
            <p className="text-[32px] select-none">NY</p>
          </div>
      </div>
    </div>
  );
}
/*
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { StarsBackground } from '../backgrounds/stars';
import { ShootingStars } from '../backgrounds/stars-shooting';
import Logo from '@/app/ui/acme-logo';
import { signOut } from '@/auth';

export default function LogoContainer() {
  return (
    <div className="flex flex-col px-2 py-2">
      <div
        className="flex h-full w-full pt-2 pb-2 rounded-lg border bg-slate-800 flex-col items-center justify-center relative"
      >
        <div>
        <div className="flex grow flex-row w-48 justify-start space-x-2">
          <Logo />
          </div>
        </div>
        <ShootingStars />
        <StarsBackground />
      </div>
    </div>
  );
}*/