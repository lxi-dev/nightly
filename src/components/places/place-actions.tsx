import React from "react";
import { Cog, GroupIcon, PlusIcon } from "lucide-react";
import { BentoBox } from "../elements/box";
import { motion } from "framer-motion";
import { MdChatBubble } from "react-icons/md";
import type { Place, Session } from "@prisma/client";
import Link from "next/link";
import { CreatePostComponent } from "../elements/create-post";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface VenueActionsProps {
  place: Place;
  user?: Session;
}

const VenueActions: React.FC<VenueActionsProps> = ({ place }) => {
  return (
    <div className="space-y-4">
      <BentoBox className="p-4 shadow-none">
        <div className="pb-2">
          <h3 className="text-base">Venue Actions</h3>
        </div>
        <div className="space-y-2 pt-0">
        <Link href={`/happen/create?place=${place.id}`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="flex items-center w-full justify-start gap-2 p-2 border bg-violet-300 text-white border-violet-700 rounded-lg hover:bg-violet-300 focus:outline-none focus:ring focus:ring-blue-300"
        >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <PlusIcon />
            </motion.div>
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            className="flex items-center gap-1"
          >
            Happening
          </motion.span>
        </motion.button>
        </Link>

        <Dialog>
        <DialogTrigger className="w-full">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center w-full justify-start gap-2 p-2 border bg-violet-300 text-white border-violet-700 rounded-lg hover:bg-violet-300 focus:outline-none focus:ring focus:ring-blue-300"
        >
            
              <MdChatBubble />
            Post
        </motion.div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post something!</DialogTitle>
            </DialogHeader>
              <CreatePostComponent type={"place"} data={{
                  place: place,
                  happeningId: undefined
                }} />
            </DialogContent>
            </Dialog>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="flex items-center w-full justify-start gap-2 p-2 border bg-violet-300 text-white border-violet-700 rounded-lg hover:bg-violet-300 focus:outline-none focus:ring focus:ring-blue-300"
        >
        <Link className="flex-row flex"
          href={`${place.id}/applicants`}>
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5 }}
            >
            <GroupIcon />
            </motion.div>
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            className="flex items-center gap-1"
          >
            Collaborators
          </motion.span>
        </Link>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="flex items-center w-full justify-start gap-2 p-2 border bg-violet-300 text-white border-violet-700 rounded-lg hover:bg-violet-300 focus:outline-none focus:ring focus:ring-blue-300"
        >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Cog />
              </motion.div>
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            className="flex items-center gap-1"
          >
            Information
          </motion.span>
        </motion.button>
        </div>
      </BentoBox>
    </div>
  );
};

export default VenueActions;