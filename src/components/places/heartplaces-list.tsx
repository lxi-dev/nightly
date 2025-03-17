'use client';

import { motion } from "framer-motion";
import { HeartIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { api } from "nglty/trpc/react";

export const HeartPlaceList = () => {
    const { data: places, isLoading } = api.places.getPlaces.useQuery({heartPlace: true});
  
    if (isLoading) return <p>Loading places...</p>;
  
    return (
      <div className="p-4">
        {places?.map((place) => (
        <motion.div
        key={place.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-2xl shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="relative w-full md:w-1/3 h-48">
            <img
              src={place.picture}
              alt={place.name}
              className="w-full h-full object-cover rounded-lg"
            />
            {place.heartPlace && (
              <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow">
                <HeartIcon className="w-5 h-5 text-red-500" />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between w-full">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {place.name}
              </h3>
              {place.city && place.address && (
                <motion.div
                  className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2"
                  whileHover={{ x: 5 }}
                >
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  {place.address}, {place.city}
                </motion.div>
              )}
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
                {place.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <UsersIcon className="w-4 h-4" />
                {place.followers.length} Followers
              </div>
              <button
                className="text-sm font-medium border"
              >
                {place.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
        ))}
      </div>
    );
  };