/* eslint-disable */

'use client';
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";

interface NotificationItemProps {
    text?: string;
}
// icon: https://iconoir.com/

const GenericNotification: React.FC<NotificationItemProps> = ({ text }) => {

return(
        <span 
            className="bg-gray-100 hover:bg-white text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500 hover:border-violet-700 transition cursor-pointer">
            <span className="">
                {text}
            </span>
        </span>
);
}

export default GenericNotification;