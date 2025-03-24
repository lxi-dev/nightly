import type { Post } from "@prisma/client"
import { motion } from "framer-motion"
import { BentoBox } from "./box"
import { UserProfileIcon } from "./user-icon"

export const PostComponent = ({post} : {post: Post}) => {

    const formatTimestamp = (timestamp: Date) => {
        const date = new Date(timestamp)
        return (
          date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
          " · " +
          date.toLocaleDateString([], { month: "short", day: "numeric" })
        )
      }

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <BentoBox className="overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="p-4 pb-0 flex flex-row items-center space-y-0 gap-3">
          <UserProfileIcon id={post.creatorId} />

            <div className="flex flex-col">
              <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                {post.id.substring(0, 8)}...
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatTimestamp(post.createdAt)}
              </span>
            </div>
          </div>

          <div className="p-4 pt-3">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{post.text}</p>
          </div>

          {/* <div className="p-2 px-4 flex justify-between border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4"> */}
              {/* <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(index)}
                className={`rounded-full gap-1.5 text-sm font-normal hover:bg-violet-50 ${
                  post.liked ? "text-violet-600" : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Heart className={`h-4 w-4 ${post.liked ? "fill-violet-600 text-violet-600" : ""}`} />
                <span>{post.likes}</span>
              </Button> */}

              {/* <Button
                variant="ghost"
                size="sm"
                className="rounded-full gap-1.5 text-sm font-normal text-gray-600 dark:text-gray-400 hover:bg-violet-50"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Reply</span>
              </Button> */}
            {/* </div> */}

            {/* <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 text-gray-600 dark:text-gray-400 hover:bg-violet-50"
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 text-gray-600 dark:text-gray-400 hover:bg-violet-50"
              >
                <Bookmark className="h-4 w-4" />
                <span className="sr-only">Save</span>
              </Button>
            </div>
          </CardFooter> */}
        </BentoBox>
      </motion.div>
    )
}