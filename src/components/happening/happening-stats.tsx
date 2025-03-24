/*
'use client';
import { motion } from "framer-motion";
import { api } from "nglty/trpc/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SlUserFollow } from "react-icons/sl";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";

export const HappeningStats = ({ id, active }: { id: string, active: boolean }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  
  const [going, setGoing] = useState<number>(0);
  const [pending, setPending] = useState<number>(0);
  const [userStatus, setUserStatus] = useState<string>('');
  const [disabled, setDisabled] = useState(false);

  const { data } = api.happening.getFollowing.useQuery(
    { happeningId: id ?? "" },
    { enabled: !!id }
  );

  const follow = api.happening.follow.useMutation({
    onSuccess: async () => {
      console.log("mutation");
    },
  });
  
  const update = api.happening.updateFollow.useMutation({
    onSuccess: async () => {
      console.log("mutation");
    },
  });

  const updateUserStatus = async (status: string) => {
    if (disabled || !userId) return;
    if (userStatus === status) {
      console.log('youre already ' + status);
      return;
    }
    
    try {
      let rsp;
      if (!userStatus) {
        rsp = await follow.mutateAsync({
          userId: userId,
          status: status,
          happeningId: id
        });
      } else {
        rsp = await update.mutateAsync({
          userId: userId,
          status: status,
          happeningId: id
        });
        
        if (rsp.status === 'going') {
          setPending(pending - 1);
          setGoing(going + 1);
        }
        if (rsp.status === 'pending') {
          setGoing(going - 1);
          setPending(pending + 1);
        }
      }

      console.log("following:", follow);
      if (status === 'going') {
        setGoing(going + 1);
      } else {
        setPending(pending + 1);
      }
      setUserStatus(rsp.status);
      
    } catch (error) {
      console.error("Error creating follow:", error);
    }
  };


  const isGoing = userStatus === 'going';
  const isPending = userStatus === 'pending';

  return (
    <motion.div className="relative overflow-hidden">
      <motion.div
        className="w-full h-full p-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {active && (
          <div className="flex flex-col w-full">
            <div className="flex flex-row flex-end items-end w-full">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateUserStatus('going')}
                className={`w-6 h-10 flex items-center justify-center rounded-md transition duration-300 ${isGoing ? 'bg-green-100 dark:bg-green-900/20' : ''}`}
              >
                {isGoing ? (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <FaCheckCircle className="w-5 h-5 text-green-500" />
                  </motion.div>
                ) : (
                  <SlUserFollow className="w-5 h-5" />
                )}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateUserStatus('pending')}
                className={`w-6 h-10 flex items-center justify-center rounded-md transition duration-300 ${isPending ? 'bg-yellow-100 dark:bg-yellow-900/20' : ''}`}
              >
                {isPending ? (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <BsBookmarkFill className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                ) : (
                  <BsBookmark className="w-5 h-5" />
                )}
              </motion.div>
            </div>

            <div className="flex justify-between mt-2 w-full text-xs">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <div className="h-2 w-2 rounded-full bg-green-400 mr-1"></div>
                <span className="text-gray-500 dark:text-gray-400">
                  {going.toString(10)}
                </span>
              </motion.div>

              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <div className="h-2 w-2 rounded-full bg-yellow-300 mr-1"></div>
                <span className="text-gray-500 dark:text-gray-400">
                  {pending.toString(10)}
                </span>
              </motion.div>
            </div>
          </div>
        )}

        {!active && (
          <div className="flex flex-row justify-center items-center h-full w-full gap-4">
            <div className="absolute -left-6 top-0 text-4xl font-bold text-gray-100 dark:text-gray-800/10">
              {going + pending}
            </div>
            
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <div className="h-2 w-2 rounded-full bg-green-400 mr-1"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {going.toString(10)}
              </span>
            </motion.div>
            
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <div className="h-2 w-2 rounded-full bg-yellow-300 mr-1"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {pending.toString(10)}
              </span>
            </motion.div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
*/