import React from "react";
import { MapPin, Users, Calendar, Heart, TrashIcon } from "lucide-react";
import { api } from "nglty/trpc/react";
import { motion } from "framer-motion";import { BentoBox } from "../elements/box";


type Props = {
  userId?: string;
};

const YourPlaceCard: React.FC<Props> = ({ userId  }) => {
    const { data: places, isLoading } = api.places.getPlaces.useQuery({ creatorId: userId}, {
        enabled: !!userId
    });
    
    const deletePlace = api.places.deletePlace.useMutation({
        onSuccess: async () => {
          console.log("mutation");
        },
      });

    const handleDelete = async (placeId: string) => {
        if(!userId) return;
        try {
            await deletePlace.mutateAsync(placeId);
        } catch (error) {
            console.error("Error in callCreate:", error);
        } finally {
        }
    }
    
    if (isLoading) return <p>Loading places...</p>;

    
    return (
        <main>
            <div className="w-full h-16 p-4 mb-4">
            <button
                type="button"
                className="border border-black dark:border-white dark:bg-white/60 text-black dark:text-black w-full items-center rounded-md p-4"
            >
            <a 
                    href='/places/create'
                    >
                        <h2>Create a new place</h2>

                    </a>
                    </button>
                    </div>
        {places?.map((place) => (
        <motion.div
        key={place.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col gap-4 p-2">
            <BentoBox className="relative w-full h-48">
                <img
                src={place.picture}
                alt={place.name}
                className="w-full h-full object-cover rounded-lg"
                />
                {place.group && (
                <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow">
                    <Heart className="w-5 h-5 text-red-500" />
                </div>
                )}
            </BentoBox>
            <div className="flex flex-col justify-between">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {place.name}
                </h3>
                {place.city && place.address && (
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {place.address}, {place.city}
                </div>
                )}
                {place.zipcode && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Zip Code: {place.zipcode}
                </p>
                )}
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
                {place.description ?? "No description available."}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {place.followers.length} Followers
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Created: {new Date(place.createdAt).toLocaleDateString()}
                </div>
                </div>
                {place.openingHours && (
                <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                    <p className="font-semibold">Opening Hours:</p>
                    <pre className="text-xs whitespace-pre-wrap">
                    {JSON.stringify(place.openingHours, null, 2)}
                    </pre>
                </div>
                )}
                <button 
                    onClick={() => handleDelete(place.id)}
                    className="w-full h-8 font-light text-md border border-aurora-900 flex flex-row justify-center items-center">
                    <TrashIcon /> delete
                </button>
            </div>
        </div>
    </motion.div>
    ))}
    </main>
  );
};

export default YourPlaceCard;