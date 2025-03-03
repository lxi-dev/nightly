'use client';
import React, { useEffect, useState } from "react";
import { api } from "nglty/trpc/react";
import Spinner from "nglty/components/elements/spinner";

const PlaceProfile = ({ id }: { id: string }) => {
  const { data: places, isLoading, isError } = api.places.getPlaces.useQuery(
    { id },
    {
      enabled: !!id, // Ensures the query runs only if id is defined
    }
  );

  const followMutation = api.places.followPlace.useMutation();
  const [following, setFollowing] = useState(false);

  // Update the following state based on the returned data
  useEffect(() => {
    setFollowing(places?.[0]?.isFollowing ?? false);
  }, [places]);

  const handleFollow = () => {
    if (id) {
      followMutation.mutate(
        { placeId: id },
        {
          onSuccess: () => {
            setFollowing(true);
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (isError || !places || places.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load place information.</p>
      </div>
    );
  }

  const place = places[0];

  if (!place) return (
    <div className="flex justify-center items-center h-screen">
    <p className="text-red-500">Failed to load place information.</p>
  </div>
  )

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-lg p-4">
        <img
          src={place.picture}
          alt={place.name}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{place.name}</h1>
        <p className="text-gray-600 mb-4">{place.description ?? "No description available."}</p>

        {place.address && (
          <div className="mb-2">
            <h2 className="text-lg font-semibold">Address:</h2>
            <p className="text-gray-600">{place.address}</p>
          </div>
        )}

        {place.city && (
          <div className="mb-2">
            <h2 className="text-lg font-semibold">City:</h2>
            <p className="text-gray-600">{place.city}</p>
          </div>
        )}

        {place.zipcode && (
          <div className="mb-2">
            <h2 className="text-lg font-semibold">Zipcode:</h2>
            <p className="text-gray-600">{place.zipcode}</p>
          </div>
        )}

        {place.openingHours && (
          <div className="mb-2">
            <h2 className="text-lg font-semibold">Opening Hours:</h2>
            <ul className="text-gray-600">
              {Object.entries(place.openingHours).map(([day, hours]) => (
                <li key={day}>
                  <span className="font-medium capitalize">{day}:</span> {hours}
                </li>
              ))}
            </ul>
          </div>
        )}

        {place.heartPlace && (
          <div className="mt-4">
            <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">
              ❤️ Place in my heart
            </span>
          </div>
        )}

        <button
          onClick={handleFollow}
          className={`mt-4 px-4 py-2 rounded-lg transition ${
            following ? "bg-green-500 hover:bg-green-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {following ? "Following" : "Follow this place"}
        </button>
      </div>
    </div>
  );
};

export default PlaceProfile;