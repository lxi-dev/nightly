'use client';
import { StarsBackground } from "../backgrounds/stars";
import { BentoBox } from "../elements/box";
import { UserProfileIcon } from "../elements/user-icon";
import Link from "next/link";
import { redirect } from "next/navigation";
import MapComponent from "../elements/map";
import { useProfile } from "nglty/contexts/profileContext";
import { Button } from "../ui/button";
import FeaturesGrid from "./feature-grid";
import LogoCubicle from "../elements/logo/logo-cubicle";
import { useEffect } from "react";
import { FaCity } from "react-icons/fa";

export const ActionsBento = () => {
  const { user, location, refreshUser } = useProfile(); 

  const locations = [
    { 
      lat: location ? location.latitude : 51.505, 
      lng: location ? location.longitude : -0.09, 
      name: 'Home',
      color: '#4A90E2',
      icon: false
    },
    // { 
    //   lat: 51.515, 
    //   lng: -0.1, 
    //   name: 'Coffee Shop',
    //   icon: Coffee,
    //   color: '#8B4513'
    // },
    // { 
    //   lat: 51.495, 
    //   lng: -0.08, 
    //   name: 'Hospital',
    //   icon: Hospital,
    //   color: '#FF6347'
    // },
    // { 
    //   lat: 51.525, 
    //   lng: -0.11, 
    //   name: 'Store',
    //   icon: Store,
    //   color: '#2E8B57'
    // }
  ];
  if (!user) return null;

  useEffect(() => {
    refreshUser();
  }, [])

  return (
    <div className="relative min-h-screen flex flex-row items-start justify-between gap-4 pt-6 pb-0">
    <div className="relative z-10 flex flex-col w-full h-full gap-4 p-2">
      <div className="flex flex-col">
        { user.handle && 
        <div className="flex flex-row w-full justify-start">
            <UserProfileIcon src={user.image} />
            <div className="flex-col pl-4 items-end">
              <p className="text-sm dark:text-gray-200">hey {user.handle ?? user.name},</p>
              <p className="text-xl dark:text-white">{user.handle && 'nice to see you again!'}</p>
            </div>
        </div>
        }
        { (!user.handle || !location )&& (
          <div className="z-10 mt-4 p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col w-full items-center">
            <h2 className="p-2 mb-8">Seems like you're new here. </h2>
            <h3 className="text-2xl mb-4">Welcome to</h3>         
            <span className="scale-150 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-700 flex flex-row gap-2">
            <LogoCubicle/> Nightly
                </span>
            </div>
               
            <FeaturesGrid />
            <p className="text-lg dark:text-gray-200">Finish setting up your Account</p>
            <Button 
              onClick={() => redirect('/profile/complete')}
              variant="outline"
              type="button">
              Okay
            
            </Button>
          </div>  
          </div>
        )}
        <div>

        </div>
      </div>
      {/* user.handle && (
      <BentoBox colSpan="1" rowSpan="4" className="p-4" animated>
        <h2 className="dark:text-white text-2xl mb-4">Feed (mock)</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b dark:border-zinc-800">
                  <UserIcon className="h-8 w-8" />
                  <div className="space-y-1">
                    <p className="text-sm">
                      <Link href="#" className="font-medium text-rose-600 hover:underline">
                        @lxia
                      </Link>
                      <span className="text-zinc-500 dark:text-zinc-400"> posted in </span>
                      <Link href="#" className="font-medium hover:underline">
                        Woodgathering 2025
                      </Link>
                    </p>
                    <time className="text-xs text-zinc-500 dark:text-zinc-400">2 hours ago</time>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b dark:border-zinc-800">
                  <UserIcon className="h-8 w-8" />
                    {/* <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@mstreue" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar> 
                  <div className="space-y-1">
                    <p className="text-sm">
                      <Link href="#" className="font-medium text-rose-600 hover:underline">
                        @mstreue
                      </Link>
                      <span className="text-zinc-500 dark:text-zinc-400"> posted 3 new </span>
                      <Link href="#" className="font-medium hover:underline">
                        Happenings
                      </Link>
                    </p>
                    <time className="text-xs text-zinc-500 dark:text-zinc-400">3 hours ago</time>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b dark:border-zinc-800">
                <UserIcon className="h-8 w-8" />
                    {/* <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@mstreue" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar> 
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="text-zinc-500 dark:text-zinc-400">It's </span>
                      <Link href="#" className="font-medium text-rose-600 hover:underline">
                        @shenaya_s
                      </Link>
                      <span className="text-zinc-500 dark:text-zinc-400"> Birthday today!</span>
                    </p>
                    <time className="text-xs text-zinc-500 dark:text-zinc-400">Today</time>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b dark:border-zinc-800">
                <UserIcon className="h-8 w-8" />
                    {/* <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@mstreue" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar> *
                  <div className="space-y-1">
                    <p className="text-sm">
                      <Link href="#" className="font-medium text-rose-600 hover:underline">
                        @bokcu
                      </Link>
                      <span className="text-zinc-500 dark:text-zinc-400"> posted in </span>
                      <Link href="#" className="font-medium hover:underline">
                        p.ara summer closing 2025
                      </Link>
                    </p>
                    <time className="text-xs text-zinc-500 dark:text-zinc-400">Yesterday</time>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                <UserIcon className="h-8 w-8" />
                    {/* <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@mstreue" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar> *
                  <div className="space-y-1">
                    <p className="text-sm">
                      <Link href="#" className="font-medium text-rose-600 hover:underline">
                        @margareten
                      </Link>
                      <span className="text-zinc-500 dark:text-zinc-400"> joined </span>
                      <Link href="#" className="font-medium hover:underline">
                        p.ara summer closing 2025
                      </Link>
                    </p>
                    <time className="text-xs text-zinc-500 dark:text-zinc-400">2 days ago</time>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50"
              >
                View all activity
              </Button>

      </BentoBox>
      )*/}
      { location && 
      <div className="flex flex-col md:flex-row gap-4">
      <BentoBox animated hover className="overflow-hidden w-full md:w-1/2 shadow-none">
        <Link href="/places">
        <div className="w-full h-full p-4 flex flex-col md:flex-row justify-start items-start">
          <div className="w-full md:w-24 h-16 overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-700">
            <MapComponent 
              locations={locations}
              zoom={12}
              interactive={false} 
              mapStyle="satellite" 
              className="pointer-events-none" />
        </div>
        <div className="md:pl-4 mt-2">
        <p 
          className="dark:text-white text-xl">Discover whats around you
          </p>
          <p className="dark:text-white text-sm">Find Groups and Places to follow.</p>
        </div>
        </div> 
      </Link>
      </BentoBox>

      <BentoBox animated className="overflow-hidden w-full md:w-1/2 cursor-pointer shadow-none p-4">
       <Link href="/happen">
       <div className="pl-4">
        <p 
          className="dark:text-white text-xl mt-2">Happenings
          </p>
          <p className="dark:text-white text-sm mt-1">Get Updates on current Events and participate</p>
        </div>
        </Link>
      </BentoBox>
      </div>
      }
      { user.handle && 
    
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
      {/* Right-hand side: Main Container */}
      <div className="sm:w-3/4 h-[450px] rounded-lg shadow-lg flex-shrink-0">
        {/* Content for the main container */}
        <BentoBox>
          <h1>This is a test</h1>
        </BentoBox>
      </div>

      {/* Left-hand side: Containers */}
      <div className="flex flex-row sm:flex-col gap-4 w-full sm:w-1/4 sm:h-[450px]">
        <div className="h-[calc(450px/2)] sm:h-[50%] w-1/2 sm:w-full rounded-lg shadow-md">
          {/* Content for the first small container */}
          <BentoBox className="p-2 items-center">
            <h2 className="text-bold text-xl">It seems like..</h2>
            <p className="mb-3">you're still going rogue.</p> 
            <div className="w-14 h-14 dark:bg-aurora-500 border border-violet-500 shadow-md p-2 rounded-xl mt-2 mb-1">
              <FaCity className="w-10 h-10"/>
            </div>
            <p className="text-sm underline text-gray-700 dark:text-gray-300 mb-6">Discover communities</p>
            <span>
            <a className="text-violet-500" href="/places/create">Create</a> your own or <a className="text-violet-500" href="/places">join</a> one!
            </span>
        </BentoBox>
        </div>
        <div className="h-[calc(450px/2)] h-full sm:h-[50%] w-1/2 sm:w-full rounded-lg shadow-md">
          {/* Content for the second small container */}
            <div className="flex flex-col items-center ">

              <small>created with <span className="text-pink-200">♥</span> by</small>
              <a className="text-xs text-violet-500" href="https://www.soundcloud.com/karllachs">karl lachs</a>
            </div>
    
        </div>
      </div>
    </div>
    }
    
      </div>
      <div className="absolute inset-0 z-0 blur-lg opacity-20">
      <StarsBackground />
      </div>
    </div>
    )
}