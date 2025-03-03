'use client';

import { api } from "nglty/trpc/react";

export const PlaceList = () => {
    const { data: places, isLoading } = api.places.getPlaces.useQuery({city: 'Bremen'});
  
    if (isLoading) return <p>Loading places...</p>;
  
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold">Places</h2>
        {places?.map((place) => (
          <div key={place.id} className="border p-2 mb-2">
            <a href={`/places/p/${place.id}`}>
            <h3 className="text-md font-bold">{place.name}</h3>
            <p>{place.description}</p>
            <p>{place.city}</p>
            </a>
          </div>
        ))}
      </div>
    );
  };