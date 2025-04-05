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
import { ApplyToPlaceButton } from "./apply-button";
import MapComponent from "../elements/map";

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

  const locations = [
    { 
      lat: 51.505, 
      lng: -0.09, 
      name: 'Home',
      color: '#4A90E2'
    }];

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
    <main>
  {/* Information Section */}
    {owner && (
      <div id="heading w-full">
      <h3 className="hidden md:block text-right text-lg font-semibold dark:text-white">
      This is your place!
      </h3>
      </div>
    )}
    <section className={`flex flex-col md:flex-row gap-4 w-full ${owner ? '' : 'mt-4'}`}>
  <div className="flex flex-col space-y-4">
    { owner && <VenueActions place={place} />}
    <div className="rounded-xl border-2 border-gray-300 dark:border-gray-700 overflow-hidden h-32">
    <MapComponent 
              locations={locations} 
              zoom={18}
              center={[locations[0]!.lat, locations[0]!.lng]}
              interactive={false} 
              mapStyle="default" 
              className="pointer-events-none" />
              </div>
    { !place.group && <VenueDetails
      openingHours={place.openingHours}
      address={`${place.address}, ${place.zipcode} ${place.city}`}
    />}
  </div>

  {/* Image Section */}
  <div className="w-full md:w-7/8">
  { place.picture && 
    <img
          src={place.picture}
          alt={place.name}
          className="w-full h-64 object-cover rounded-2xl mb-4"
        />
  }
        <div className="flex w-full justify-between items-center">
          <h1 className="text-2xl font-bold mb-2">{place.name}</h1>
          <div>
          { !owner && <button
          onClick={handleFollow}
          className={`px-4 py-2 rounded-lg transition ${
            following ? "bg-green-500 hover:bg-green-600 text-white" : "bg-violet-300 hover:bg-violet-300 text-white"
          }`}
        >
          {following ? "Following" : "Follow this place"}
        </button>}
        { (!owner && place.applicationsEnabled) &&<ApplyToPlaceButton placeId={place.id} />}
          </div>
        </div>
        <div className="w-full">
          {place.category}
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
        {place.group && (
          <div className="mt-4">
            <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">
              ❤️ Place in my heart
            </span>
          </div>
        )}
      </div>
    </section>
    </main>
  );
};

export default PlaceProfile;