'use client';
import React, { useEffect, useState } from "react";
import { api } from "nglty/trpc/react";
import Spinner from "nglty/components/elements/spinner";
import { Cog, GroupIcon, PlusIcon } from "lucide-react";
import { MdChatBubble } from "react-icons/md";
import { motion } from "framer-motion";
import { CreatePostComponent } from "../elements/create-post";
import Link from "next/link";

const PlaceProfile = ({ id, userId }: { id: string, userId?: string }) => {
  const { data: places, isLoading, isError } = api.places.getPlaces.useQuery(
    { id },
    {
      enabled: !!id, // Ensures the query runs only if id is defined
    }
  );


  const followMutation = api.places.followPlace.useMutation();
  const [owner, setOwner] = useState(false);
  const [following, setFollowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
      {owner && <div className="w-lg p-4 dark:text-white">
      <div className="flex flex-row md:flex-col items-end gap-2">
        <div id="heading">
        <h3 className="hidden text-right md:flex text-lg font-semibold dark:text-white">This is your place!</h3>
        <small className="hidden md:flex align-right">Add posts, happenings or participants.</small>

        </div>

        <Link href={`/happen/create?place=${place.id}`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="flex items-center justify-end gap-2 p-2 border bg-blue-600 text-white border-blue-700 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            className="flex items-center gap-1"
          >
            Happening
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <PlusIcon />
            </motion.div>
          </motion.span>
        </motion.button>
        </Link>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="flex items-center justify-end gap-2 p-2 border bg-blue-600 text-white border-blue-700 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            className="flex items-center gap-1"
          >
            Post
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <MdChatBubble />
            </motion.div>
          </motion.span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="flex items-center justify-end gap-2 p-2 border bg-blue-600 text-white border-blue-700 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            className="flex items-center gap-1"
          >
            Collaborators
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5 }}
            >
              <GroupIcon />
            </motion.div>
          </motion.span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="flex items-center justify-end gap-2 p-2 border bg-blue-600 text-white border-blue-700 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            className="flex items-center gap-1"
          >
            Information
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Cog />
            </motion.div>
          </motion.span>
        </motion.button>
      </div>
    </div>}
    <div className="w-full">
      <div className="dark:text-white p-4">
        <img
          src={place.picture}
          alt={place.name}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{place.name}</h1>
        {owner && <CreatePostComponent type={"place"} session={null} data={{
            place: place,
          }} />
        }
        {/* 
        <section className="flex flex-col">
        { !place.posts && <h2 className="text-2xl text-black dark:text-white">There are no Posts yet.</h2>}
        { posts?.slice().reverse().map((item) => (

        <div className="w-full flex items-center mt-6">
          <div className="flex-none">
            <UserProfileIcon id={item.creatorId} />
          </div>
          <div className="flex-grow ml-2">
            <div className="text-black dark:text-white">
              {item.creatorId}
              <BentoBox colSpan="1" rowSpan="1" >
                <div className="pt-4 pb-4 pl-3 pr-3">
                  <p className="dark:text-white text-black">{item.text}</p></div>
            </BentoBox>
                  <small className="text-gray-600">{item.createdAt.toString()}</small>
            </div>
          </div>
        </div>
      ))}
      </section>
    }
      */}
      { owner && <h4 className="text-lg font-bold dark:text-white my-4">Information</h4>}
      <motion.div
        initial={{ maxHeight: "15vh" }}
        animate={{ maxHeight: isExpanded ? "100%" : "15vh" }}
        transition={{ duration: 0.3 }}
        className={`overflow-hidden relative mb-4 ${
          isExpanded
            ? ""
            : "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1/3 after:bg-gradient-to-t after:from-white dark:after:from-black after:to-transparent dark:after:from-gray-900"
        }`}
      >
        <div
          className="text-gray-600 dark:text-gray-300 mb-12"
          dangerouslySetInnerHTML={{ __html: place.description ?? "<p>No description available.</p>" }}
        ></div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="z-20 absolute bottom-0 text-center p-2 mt-4 text-sm text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
      >
        {isExpanded ? "Show Less" : "Show More"}
      </motion.button>
      </motion.div>

      <div className="flex flex-row align-center items-center w-full justify-between">
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
      </div>
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
    </section>
  );
};

export default PlaceProfile;