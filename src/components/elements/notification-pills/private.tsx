/* eslint-disable */

'use client';
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";

interface NotificationItemProps {
    state?: boolean;
}
// icon: https://iconoir.com/

const PrivacyNotification: React.FC<NotificationItemProps> = ({ state }) => {
    const [enabled, setPrivate] = useState<boolean>(state ?? true);

    const onClickHandler = () => {
        const changePrivacy = new CustomEvent('select:change-privacy', {
            detail: !enabled,
          });
        document.dispatchEvent(changePrivacy);
    }

    useEffect(() => {
        setPrivate(state ? true : false);
    }, [state]);
return(
        <span 
            className="bg-gray-100 hover:bg-white text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 hover:border-violet-600 transition cursor-pointer">
            { !enabled && <svg width="14px" height="14px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M19.5 16L17.0248 12.6038" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17.5V14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.5 16L6.96895 12.6124" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 8C6.6 16 17.4 16 21 8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>}
            { enabled && <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000" strokeWidth="1.5"><path d="M3 13C6.6 5 17.4 5 21 13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z" fill="#000000" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>}  
            <span className="ml-1">
                {enabled ? 'Öffentlich' : 'Privat'}
            </span>
        </span>
);
}

export default PrivacyNotification;