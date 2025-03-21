'use client';
import { StarsBackground } from "../backgrounds/stars";
import { BentoBox } from "../elements/box";
import type { Session } from "next-auth";
import { UserProfileIcon } from "../elements/user-icon";
import Link from "next/link";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { UserIcon } from "lucide-react";
import { Button } from "../ui/button";
type UserData = {
  image?: string;
  name?: string;
  handle?: string;
}
export const ActionsBento = ({ session } : { session: Session}) => {
  const [user, setUser] = useState<UserData>({});

  useEffect(() => {
    if(session.user) setUser(session.user as UserData);
  }, [session])

  const bentoClass = "flex rounded-lg border-2 flex-col bg-gray-200 dark:bg-slate-900 dark:border-white/10 border-opacity-60"
  return (
    <div className="relative h-full flex flex-row items-center justify-between gap-4 pt-6 pb-0">
    <div className="relative z-10 flex flex-col w-full gap-4 p-2">
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
        { !user.handle && (
          <BentoBox animated className="z-10">
          <div className="flex flex-row dark:text-white p-4 justify-between">
            <h2 className="p-2">Seems like you're new here, complete your Profile!</h2>
            <button 
              onClick={() => redirect('/profile/complete')}
              type="button" className="w-32 rounded-md font-semibold bg-aurora-900">
              lets go!
            
            </button>
          </div>  
          </BentoBox>
        )}
        <div>

        </div>
      </div>
      { user.handle && (
      <BentoBox colSpan="1" rowSpan="4" className="p-4" animated>
        <h2 className="dark:text-white text-2xl mb-4">Feed (mock)</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b dark:border-zinc-800">
                  <UserIcon className="h-8 w-8" />
                    {/* <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@lxia" />
                    <AvatarFallback>LX</AvatarFallback> */}
                  {/* </Avatar> */}
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
                  </Avatar> */}
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
                  </Avatar> */}
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
                  </Avatar> */}
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
                  </Avatar> */}
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
      )}
      <div className="flex flex-row gap-4">
      <BentoBox animated hover className="overflow-hidden min-h-48 w-1/2  bg-[url(/images/places-card-3.jpg)] bg-center bg-cover bg-no-repeat">
        <div className="w-full h-full">
          <div className="absolute z-10 rounded-2xl bg-black/30 m-4 p-2 ">

        <a 
          href="/places"
          className="dark:text-white text-2xl mb-4">Discover Places
          </a>
          </div>

        </div>
        <img src='' className="z-0 relative -translate-y-16"/> 

      </BentoBox>

      <BentoBox animated className="overflow-hidden min-h-48 dark:hover:border-aurora-700 transition cursor-pointer bg-[url(/images/happeing-card-bg.png)] bg-top bg-cover bg-no-repeat">
       <Link href="/happen">
       <div className="h-14 p-4">

        <h2 className="dark:text-white text-2xl mb-4">Happenings</h2>
       </div>
        <div className="w-full min-h-32 h-full z-10">
          <p className="hidden md:flex dark:text-white p-4 text-justify">
            Create another Memory. Either Placebound, Private or Public. Invite people to your happening and manage helping hands! Chat about whatever is important with all attendees.
          </p>
        </div>
        </Link>
      </BentoBox>
      </div>
      <div 
        className={`${bentoClass} col-span-1 p-6 row-span-3 hover:border-aurora-600`}
      >
        <p className="text-2xl dark:text-white">Place verwalten</p>
      </div>
    
      <div 
        className={`${bentoClass} col-span-1 row-span-2 p-6 hover:border-aurora-800`}
      >
        <p className="text-2xl dark:text-white">Freunde hinzufügen</p>
      </div>
    
      </div>
      <div className="absolute inset-0 z-0">
      <StarsBackground />
      </div>
    </div>
    )
}