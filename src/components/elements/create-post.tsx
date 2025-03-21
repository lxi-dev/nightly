import { GoCommentDiscussion } from "react-icons/go";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { UserProfileIcon } from "./user-icon";
import { api } from "nglty/trpc/react";
import type { Session } from "next-auth";
import type { Place } from "@prisma/client";

type CreatePostData = {
  place?: Place;
  happeningId?: string;
};

export const CreatePostComponent = ({
  type,
  session,
  data,
}: {
  type: string;
  session: Session | null;
  data: CreatePostData;
}) => {
  const [pending, setPending] = useState(false);
  const [newPost, setNewPost] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const createPlacePost = api.places.postAsOwner.useMutation({
    onSuccess: async () => {
      console.log("mutation");
    },
  });

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight - 48}px`;
    }
  };

  const submitPost = async () => {
    if (type === "place") {
      try {
        setPending(true);
        if (!data.place?.id) return;
        const post = await createPlacePost.mutateAsync({
          placeId: data.place.id,
          text: newPost ?? "",
        });

        console.log("Places post:", post);
        setNewPost("");
      } catch (error) {
        console.error("Error creating post for Place:", error);
      }
      setPending(false);
    }
  };

  return (
    <section className="flex flex-row w-full mt-2 mb-2">
      <div className="flex-none">
        <UserProfileIcon src={data.place?.picture ? data.place.picture : session?.user.image} />
        <small>{session?.user.handle}</small>
      </div>
      <div className="flex-grow ml-2 relative align-center">
      <div className="relative bg-gray-200 rounded-md flex items-center pt-4">
        <textarea
          ref={textareaRef}
          placeholder="Write something..."
          value={newPost}
          onChange={(e) => {
            setNewPost(e.target.value);
            adjustTextareaHeight();
          }}
          onInput={adjustTextareaHeight}
          className="dark:text-white text-black w-full bg-transparent pl-4 pr-12 rounded-md transition-all ease-in-out duration-200 resize-none overflow-hidden focus:outline-none"
          />
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => submitPost()}
          className="absolute right-2 h-8 w-8 flex justify-center items-center bg-violet-700 rounded-full text-white hover:bg-violet-700 shadow-lg transition-all ease-in-out duration-200"
          disabled={pending}
        >
          <GoCommentDiscussion className="w-5 h-5" />
        </motion.button>
      </div>
      </div>

    </section>
  );
};
