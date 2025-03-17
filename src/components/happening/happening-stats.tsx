'use client';
import { motion } from "motion/react";
import { api } from "nglty/trpc/react";
import { useEffect, useState } from "react";

import { SlUserFollow } from "react-icons/sl";
import { MdOutlineQuestionMark } from "react-icons/md";
import { BentoBox } from "../elements/box";



export const HappeningStats =  ({id, userId, active} : {id: string, userId?: string, active: boolean}) => {
    const [going, setGoing] = useState<number>(0);
    const [pending, setPending] = useState<number>(0);
    const [userStatus, setUserStatus] = useState<string>('');
    const [disabled, setDisabled] = useState(false);

    const { data } = api.happening.getFollowing.useQuery(
      { happeningId: id ?? "" },
      { enabled: !!id } // Enable query only if `id` is provided
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
        if(disabled || !userId) return;
        if (userStatus === status ) {
            console.log('youre already ' + status);
            return;
        }
        //setPending(true);
        try {
            let rsp;
            if(!userStatus){
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
                })
                if(rsp.status === 'going') {
                    setPending(pending - 1);
                    setGoing(going + 1);
                }
                if (rsp.status === 'pending') {
                    setGoing(going - 1)
                    setPending(pending - 1);
                }
            }
        
            console.log("following:", follow);
            if (status === 'going') {
                setGoing(going + 1);
            } else {
                setPending(pending + 1);
            }
            setUserStatus(rsp.status)
            
          } catch (error) {
            console.error("Error creating follow:", error);
          } finally {
              //setPending(false);
          }
        };
      

    useEffect(() => {
      if (!userId) setDisabled(true);
      if (userId) setDisabled(false);

      const filteredGoing = data?.filter(x => x.status === 'going');
      const filteredPending = data?.filter(x => x.status === 'tentative');

      if (filteredGoing) setGoing(filteredGoing.length);
      if (filteredPending) setPending(filteredPending.length);

      const userInList = data?.filter(x => x.userId === userId);

      if(!userInList) return;
      const userStatus = userInList[0]?.status ?? '';
      setUserStatus(userStatus);
    }, [data, userId]);
  
    return (
        <BentoBox animated className="pl-6 pr-6 pt-4 pb-4">
        <div className="w-full dark:text-white items-center text-center">
            { userStatus && <span>You are {userStatus}</span> }
        { active && (
            <div>
            <div className="flex flex-row w-full gap-4 mt-3">
                <motion.div 
                whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.005 },
                }}
                onClick={() => updateUserStatus('going')}
                    className="w-1/2 flex items-center pt-1 pb-1 pl-6 pr-6 bg-green-300 border border-green-500 hover:shadow-md rounded-md dark:text-white text-md transition">
                    <span className="m-auto text-2xl">
                    <SlUserFollow className="w-7 h-7"/>

                     </span>
                </motion.div>
                <motion.div 
                whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.005 },
                }}
                onClick={() => updateUserStatus('pending')}
                    className="w-1/2 flex items-center pt-1 pb-1 pl-6 pr-6 bg-yellow-200 hover:shadow-sm rounded-md dark:text-white text-md transition">
                    <span className="m-auto text-sm flex flex-row">
                    <MdOutlineQuestionMark className="w-7 h-7"/>
                    
                    </span>
                </motion.div>
                </div>
                <div className="flex items-center mt-6 h-full w-full">

                <small className="m-auto text-slate-500">{going.toString(10)} going - {pending.toString(10)} pending</small>
                </div>
            </div>
        )}
        </div>
        {!active && 
        <div className="flex flex-col h-full w-full">
            <small className="m-auto text-slate-500">{going.toString(10)} going</small>
            <small className="m-auto text-slate-500"> {pending.toString(10)} pending</small>
            </div>
        }
        </BentoBox>
    )
}