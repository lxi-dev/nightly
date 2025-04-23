'use client';
import { api } from "nglty/trpc/react";
import PlaceListItem from "./place-list-item";
import Spinner from "../elements/spinner";

export const AdminPlacesList = () => {
    const { data: places, isLoading, isError } = api.places.getSimplifiedPlaces.useQuery();

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <div>Failed to load users.</div>;
    }
    return(
        <main>
            { places?.map((place)  => {
                return <PlaceListItem 
                    id={place.id} 
                    name={place.name} 
                    group={place.group} 
                    verified={place.verified} 
                    createdAt={place.createdAt.toLocaleDateString()} 
                    creatorId={place.creatorId}  
                />
            })}
        </main>
    )
}