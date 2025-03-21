/* eslint-disable */

'use client';
import { Sparkles } from "lucide-react";
import { Major_Mono_Display } from "next/font/google";
import { redirect } from "next/navigation";
import { StarsBackground } from "nglty/components/backgrounds/stars";


export default function LogoCubicle() {
  return (
    <div 
      className="flex flex-col bg-gradient-to-r from-purple-500/30 via-violet-700/30 to-teal-500/30 overflow-hidden w-6 h-6 border-slate-700 shadow-sm rounded-md relative" 
      onClick={() => redirect('/')} 
    >
      <div className="absolute inset-0 z-0">
        <StarsBackground starDensity={0.05}/>
        </div>
        <div className="flex grow flex-row w-6 justify-start relative z-10">
          <div className={`flex flex-row items-center leading-none text-white`}>
            <p className="text-12 select-none"><Sparkles className="h-4 w-4 text-white ml-1" />
            </p>
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