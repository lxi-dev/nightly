'use client';
import React, { useEffect, useState } from "react";
import { api } from "nglty/trpc/react";
import Spinner from "nglty/components/elements/spinner";
import { CreatePostComponent } from "../elements/create-post";
import VenueActions from "./place-actions";
import VenueDetails from "./location-card";
import { Tab, TabContent, Tabs } from "../ui/tabs";
import { PostComponent } from "../elements/post";
import { HappeningsList } from "../happening/happenings-list";

const PlaceProfile = ({ id, userId }: { id: string, userId?: string }) => {
  const { data: places, isLoading, isError } = api.places.getPlaces.useQuery(
    { id },
    {
      enabled: !!id, // Ensures the query runs only if id is defined
    }
  );
  const { data: posts } = api.places.getPosts.useQuery(
    { placeId : id }, 
    { enabled : !!id,

    }
  )
  const { data: happenings} = api.happening.getByVenue.useQuery({venue: id},
    {
      enabled: !!id,
    }
  )


  const followMutation = api.places.followPlace.useMutation();
  const [owner, setOwner] = useState(false);
  const [following, setFollowing] = useState(false);

  // Update the following state based on the returned data
  useEffect(() => {
    const place = places?.[0];
    if (!place) return;
    if(userId && place) {
      console.log(userId);
      console.log(place.creatorId);
      setOwner(userId === place.creatorId ? true : false)
    }
    setFollowing(place.isFollowing ?? false);
  }, [places, userId]);

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
    <section className="flex flex-col md:flex-row">
      <div className="w-lg p-4 dark:text-white">
      <div className="flex flex-row md:flex-col items-center gap-2">
        <div id="heading">
        {owner && <h3 className="hidden text-right md:flex text-lg font-semibold dark:text-white">This is your place!</h3>}
        </div>
        {owner && <VenueActions place={place} />}
        <VenueDetails openingHours={place.openingHours} address={`${place.address}, ${place.zipcode} ${place.city}`}/>
      </div>
    </div>
    <div className="w-full">
      <div className="dark:text-white p-4">
        <img
          src={place.picture}
          alt={place.name}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <div className="flex w-full justify-between items-center">
          <h1 className="text-2xl font-bold mb-2">{place.name}</h1>
          { !owner && <button
          onClick={handleFollow}
          className={`px-4 py-2 rounded-lg transition ${
            following ? "bg-green-500 hover:bg-green-600 text-white" : "bg-violet-700 hover:bg-violet-700 text-white"
          }`}
        >
          {following ? "Following" : "Follow this place"}
        </button>}
        </div>

        <Tabs defaultActiveTab="info">
        <Tab id="info" label="Description">
          <TabContent>
        <div
          className="text-gray-600 dark:text-gray-300 mb-12"
          dangerouslySetInnerHTML={{ __html: place.description ?? "<p>No description available.</p>" }}
        ></div>    
          </TabContent>
        </Tab>

        <Tab id="posts" label="Posts">
          <TabContent>
            <div className="flex flex-col w-full">
              {owner && <CreatePostComponent type={"place"} session={null} data={{
                place: place,
              }} />
              }
              <section className="flex flex-col">
        { !posts && <h2 className="text-2xl text-black dark:text-white">There are no Posts yet.</h2>}
          
        { posts && 
          <div className="flex flex-col space-y-4">
            {posts?.slice().reverse().map((item, index) => (
              <PostComponent key={index} post={item} />
          ))}
          </div>}
      </section>
      </div>
          </TabContent>
        </Tab>
        <Tab id="happenings" label="Happenings">
          <TabContent>
            {happenings && <HappeningsList happenings={happenings}/>}
          </TabContent>
        </Tab>
      </Tabs>   
        {place.heartPlace && (
          <div className="mt-4">
            <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">
              ❤️ Place in my heart
            </span>
          </div>
        )}
      </div>
    </div>
    </section>
  );
};

export default PlaceProfile;