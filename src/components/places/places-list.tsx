'use client';

import { motion } from "motion/react";
import { api } from "nglty/trpc/react";
import { redirect } from "next/navigation";
import PlaceTile from "./place-tile";

export const PlaceList = () => {
    const { data: places, isLoading } = api.places.getPlaces.useQuery({city: 'Bremen'});
  
    if (isLoading) return <p>Loading places...</p>;
  
    return (
      <main>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {places?.map((place) => (
        <motion.div

        key={place.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div 
          onClick={() => redirect(`places/p/${place.id}`)}>
            <PlaceTile place={place} />
          {/* <BentoBox className="relative w-full md:w-1/3 h-48">
            <img
              src={place.picture}
              alt={place.name}
              className="w-full h-full object-cover rounded-2xl"
            />
            {place.group && (
              <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow">
                <HeartIcon className="w-5 h-5 text-red-500" />
              </div>
            )}
          </BentoBox>
          <div className="flex flex-col justify-start w-full pl-1 pr-1">
            <div className="flex flex-row justify-between w-full">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {place.name}
              </h3>
              <div className="flex items-center justify-between">
                {place.isFollowing && <CheckIcon className="text-gray-500 dark:text-gray-400 pr-2"/>}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <UsersIcon className="w-4 h-4" />
                {place.followers.length}
              </div>
            </div>
            </div>
            <div className="w-full flex flex-row justify-between -mt-1">

              {place.city && (
                <motion.div
                className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                whileHover={{ x: 5 }}
                >
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  {place.city}
                </motion.div>
              )}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4 mt-2">
                {place.description === "" ? "No description provided." : place.description}
              </p>
            </div> */}
          </div>
      </motion.div>
        ))}
        </div>
      </main>
    );
  };