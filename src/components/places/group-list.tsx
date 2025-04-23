'use client';

import { motion } from "framer-motion";
import { api } from "nglty/trpc/react";
import PlaceTile from "./place-tile";
import { redirect } from "next/navigation";
import Spinner from "../elements/spinner";
import { NoContentAvailable } from "../elements/no-content";

export const GroupList = () => {
    const { data: places, isLoading } = api.places.getPlaces.useQuery({group: true});
  
    if (isLoading) return <Spinner />;
  
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {places?.length === 0 && <NoContentAvailable />}
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
    );
  };