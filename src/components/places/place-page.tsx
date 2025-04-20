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
import { motion } from "framer-motion";
import GenericNotification from "../elements/notification-pills/generic";

const PlaceProfile = ({ id, userId }: { id: string, userId?: string }) => {
  const [following, setFollowing] = useState(false);
  const { data: places, isLoading, isError } = api.places.getPlaces.useQuery(
    { id },
    {
      enabled: !!id, // Ensures the query runs only if id is defined
    }
  );
  const { data: posts } = api.places.getPosts.useQuery(
    { placeId : id }, 
    { enabled : !!id && following,

    }
  )
  const { data: happenings} = api.happening.getByVenue.useQuery({venue: id},
    {
      enabled: !!id,
    }
  )


  const followMutation = api.places.followPlace.useMutation();
  const [owner, setOwner] = useState(false);

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
    <main className="h-full">
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
    { !place.group && 
    <>
    <div className="rounded-xl border-2 border-gray-300 dark:border-gray-700 overflow-hidden h-32">
    
    <MapComponent 
              locations={locations} 
              zoom={18}
              center={[locations[0]!.lat, locations[0]!.lng]}
              interactive={false} 
              mapStyle="default" 
              className="pointer-events-none" />
              </div>
    <VenueDetails
      openingHours={place.openingHours}
      address={`${place.address}, ${place.zipcode} ${place.city}`}
    />
    </>}
  </div>

  {/* Image Section */}
  <div className="w-full md:w-7/8 -translate-y-8">
  { place.picture && 
        <img
          src={place.picture}
          alt="cover"
          className="w-full h-36 object-cover rounded-2xl border md:border-2 border-gray-300 dark:border-gray-700 translate-y-8 z-0"
        />
      }
      <motion.div
          className="flex mx-auto bg-white flex-row md:flex-row justify-between dark:bg-aurora border-2 border-gray-300 dark:border-gray-700 shadow-lg rounded-2xl p-4 z-10 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
            <div className="flex flex-col">
                    <h1 className="text-xl font-mono font-bold dark:text-white">{place.name}</h1>
                    <span className="flex flex-row gap-2 mt-1">
                    {place.group && (
            <GenericNotification text="❤️ Group" />
              
        )}
                    <GenericNotification text={place.category!} />
                    </span>
            </div>
          { !owner && <button
          onClick={handleFollow}
          className={`px-4 py-2 rounded-lg transition ${
            following ? "bg-green-500 hover:bg-green-600 text-white" : "bg-violet-300 hover:bg-violet-300 text-white"
          }`}
        >
          {following ? "Following" : "Follow this place"}
        </button>}
        { (!owner && place.applicationsEnabled) &&<ApplyToPlaceButton placeId={place.id} />}
        </motion.div>
        <Tabs defaultActiveTab="info">
        <Tab id="info" label="Description">
          <TabContent>
        <div
          className="text-gray-600 dark:text-gray-300 mb-12 overflow-scroll"
          dangerouslySetInnerHTML={{ __html: place.description ?? "<p>No description available.</p>" }}
        ></div>    
          </TabContent>
        </Tab>

        <Tab id="posts" label="Posts">
          <TabContent>
            <div className="flex flex-col w-full">
              {owner && <CreatePostComponent type={"place"} data={{
                place: place,
              }} />
            }
              <section className="flex flex-col">
        { (!posts && following) && <h2 className="text-2xl text-black dark:text-white">There are no Posts yet.</h2>}
          
            { !following && <p>Follow this place to see posts.</p>}
        { ( posts && following )&& 
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
      </div>
    </section>
    </main>
  );
};

export default PlaceProfile;