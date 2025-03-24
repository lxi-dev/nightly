import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UserProfileIcon } from "./user-icon";
import { api } from "nglty/trpc/react";
import type { Session } from "next-auth";
import type { Place } from "@prisma/client";
import { ImageIcon, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { useLoading } from "nglty/contexts/loadingContext";

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
  const [isComposing, setIsComposing] = useState(false)
  const {showLoading, hideLoading} = useLoading();
  const [postText, setPostText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const createPlacePost = api.places.postAsOwner.useMutation({
    onSuccess: async () => {
      console.log("mutation");
    },
  });

  const submitPost = async () => {
    if (type === "place") {
      try {
        showLoading();
        if (!data.place?.id) return;
        const post = await createPlacePost.mutateAsync({
          placeId: data.place.id,
          text: postText ?? "",
        });

        console.log("Places post:", post);
        setPostText("");
      } catch (error) {
        console.error("Error creating post for Place:", error);
      }
      hideLoading();
    }
  };

  return (
      <div className="mb-8 shadow-lg bg-white dark:bg-gray-800 overflow-hidden">
            <div className="p-0">
              <div className="flex items-start p-4 gap-3">
              <UserProfileIcon src={data.place?.picture ? data.place.picture : session?.user.image} />

                <div className="flex-1">
                  <textarea
                    ref={textareaRef}
                    placeholder={isComposing ? "What's on your mind?" : "Write something..."}
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    onFocus={() => setIsComposing(true)}
                    className={`resize-none w-full border-0 focus:ring-0 p-2 text-base placeholder:text-gray-400 transition-all duration-300 ${
                      isComposing ? "min-h-[120px]" : "min-h-[40px]"
                    }`}
                  />

                  <AnimatePresence>
                    {isComposing && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center justify-between pt-2 pb-1 px-2"
                      >
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-9 w-9 text-violet-600 hover:bg-violet-100"
                          >
                            <ImageIcon className="h-5 w-5" />
                            <span className="sr-only">Add image</span>
                          </Button>
                        </div>

                        <Button
                          onClick={submitPost}
                          disabled={!postText.trim()}
                          className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-4 transition-all duration-200 hover:shadow-md disabled:opacity-50"
                        >
                          Post
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {!isComposing && (
                  <Button
                    size="icon"
                    className="rounded-full bg-violet-100 hover:bg-violet-200 text-violet-600 h-10 w-10 transition-all duration-200 hover:shadow-md"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span className="sr-only">Quick post</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
  );
};
