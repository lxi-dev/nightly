'use client';

import { motion } from "motion/react";
import { api } from "nglty/trpc/react";
import { redirect } from "next/navigation";
import PlaceTile from "./place-tile";
import { useProfile } from "nglty/contexts/profileContext";
import { NoContentAvailable } from "../elements/no-content";
import Spinner from "../elements/spinner";

export const PlaceList = () => {
  const { location } = useProfile();
    const { data: places, isLoading } = api.places.getPlaces.useQuery(
      { city: location!.displayName.split(',')[0]}
     ,{ enabled: !!location }
    );
  
    if (isLoading) return <Spinner />;
  
    return (
      <main>
        {places?.length === 0 &&
        <NoContentAvailable />}
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
          </div>
      </motion.div>
        ))}
        </div>
      </main>
    );
  };