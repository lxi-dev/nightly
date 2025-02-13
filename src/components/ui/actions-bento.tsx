'use client';
import { StarsBackground } from "../backgrounds/stars";
import { Seperator } from "../elements/seperator"

export const ActionsBento = () => {

  const bentoClass = "flex rounded-lg border-2 flex-col bg-gray-200 dark:bg-slate-900 dark:border-white/10 border-opacity-60"
  return (
    <div className="relative flex flex-row items-center justify-between gap-4 pt-12 pl-12 pr-12 pb-0 h-screen bg-white dark:bg-black">
    <div className="relative z-10 grid h-full w-full gap-4 p-2 grid-cols-3 grid-rows-5 border-opacity-600">
      <div 
        className={`${bentoClass} col-span-1 row-span-2 p-6 hover:border-aurora-900`}
      >
        <p className="text-2xl dark:text-white">235</p>
        <Seperator text="Friends" />
      </div>
      <div 
        className={`${bentoClass} col-span-2 p-6 row-span-1 hover:border-aurora-200`}
      >
        <a 
          href="/places"
          className="text-2xl dark:text-white">Places entdecken
          </a>
      </div>
    
      <div 
        className={`${bentoClass} col-span-2 p-6 row-span-4 hover:border-aurora-300`}
      >
        <p className="text-2xl dark:text-white">Feed</p>
      </div>
    
      <div 
        className={`${bentoClass} col-span-1 p-6 row-span-2 hover:border-aurora-400`}
      >
        <p className="text-2xl dark:text-white">Event erstellen</p>
      </div>
    
      <div 
        className={`${bentoClass} col-span-1 p-6 row-span-3 hover:border-aurora-600`}
      >
        <p className="text-2xl dark:text-white">Place verwalten</p>
      </div>
    
      <div 
        className={`${bentoClass} col-span-2 row-span-2 p-6 hover:border-aurora-800`}
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