/* eslint-disable */

'use client';
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import { motion, transform, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";

interface NotificationItemProps {
    state?: number;
}
// icon: https://iconoir.com/
const mapRemainingToColor = transform([2, 10], ["#111827", "#7C3AED"]);
const mapRemainingToSpringVelocity = transform([0, 5], [50, 0]);

const SignupNotification: React.FC<NotificationItemProps> = ({ state }) => {
    const [count, setCount] = useState<number>(state ? state : 0);
    const controls = useAnimation();

    useEffect(() => {
        setCount(state ? state : 0);
        if (count < 5) return;
    
        controls.start({
          scale: 1,
          transition: {
            type: "spring",
            velocity: 400,
            stiffness: 700,
            damping: 80
          }})
    }, [state]);
return(
        <span 
            className="bg-gray-100 hover:bg-white text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 hover:border-violet-700 transition cursor-pointer">
                <svg width="14px" height="14px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M9 12H12M15 12H12M12 12V9M12 12V15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="#000000" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path></svg>            <span className="ml-1">
                <motion.span
                    animate={controls}
                    style={{ color: mapRemainingToColor(count) }}
                >
                    {count.toString()} Schichten ausgewählt.

                </motion.span>
            </span>
        </span>
);
}

export default SignupNotification;