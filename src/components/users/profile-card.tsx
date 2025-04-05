'use client'
import { useProfile } from "nglty/contexts/profileContext";
import { UserProfileIcon } from "../elements/user-icon";
import { useEffect } from "react";

export const ProfileCard = () => {

    const { user, refreshUser } = useProfile();

    useEffect(() => {
        refreshUser();
    }, []);
    
    if (!user) return null;
    return (
        <main>
            <div className="flex flex-row">
                <div className="flex flex-row w-full items-center justify-between p-4 border-b dark:border-slate-800">
                    <div className="flex flex-row items-center">
                    <UserProfileIcon src={user.image}/>
                    <p className="ml-4">Hey {user.name}, Welcome to your Profile! 🎉</p>
                </div>
                <div
                    className="flex w-12 mr-2 flex-col items-center hover:text-aurora-900 dark:text-white cursor-pointer">
                </div>
            </div>
        </div>
        <div className={` pl-4 pt-3  pb-6`}>
                <div className="flex flex-row">
                    <div className="flex-1">
                        <div className="flex flex-col mr-4">
                            <label className="text-sm text-slate-600">Handle / Username</label>
                            <input
                            disabled
                            value={user.handle!}
                                placeholder='set your handle'
                                className="p-2 bg-transparent text-black dark:text-white invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 ..."

                                type="text">            
                            </input>
                            <label className="text-sm text-slate-600">Location</label>
                            <input
                                disabled
                                value={user.location!}
                                //className="bg-transparent text-lg mr-6 disabled:text-white"
                                placeholder='set your location'
                                className="p-2 bg-transparent invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 ..."

                                type="text">            
                            </input>
                            <label className="text-sm text-slate-600">Age</label>
                            <input
                                disabled
                                value={user.age!}
                                //className="bg-transparent text-lg mr-6 disabled:text-white"
                                placeholder='13.12.2000'
                                className="p-2 bg-transparent invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
                                type="date">            
                            </input>
                        </div>
                        <small>Email</small>
                        <p className="p-2 text-slate-400">{user.email}</p>
                    </div>
                    <div className="flex-1">   
                        <div className="flex flex-col">
                    <label>Bio</label>
                    <textarea
                    disabled
                    value={user.bio!}
                    //className="bg-transparent text-lg mr-6 disabled:text-white"
                    placeholder='nothing here'
                    className="p-2 h-36 bg-transparent invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
                    > 

                     </textarea>
                </div>
            </div>
                            
                </div>
            </div>
        </main>
    );
}