'use client'
import { UserProfileIcon } from "../elements/user-icon";
import { CheckIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import type { Session } from "next-auth";
import { api } from "nglty/trpc/react";
import { useEffect, useState } from "react";

type UserData = {
    id: string;
    handle: string;
    location: string;
    age: string;
    bio: string;
}   

export const ProfileCard = ({profile} : {profile : Session}) => {

    const [editMode, setEditMode ] = useState(true);
    const [pending, setPending] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        id: profile.user.id,
        handle: '',
        location: '',
        age: '',
        bio: ''
    });

    const handleChange = (field: string, value: string | Date) => {
        setUserData((prev) => ({
          ...prev,
          [field]: value,
        }));
      };

      const handleSubmit = async () => {
        try {
            const updatedData: UserData = {
                id: profile.user.id, // Ensure `profile.user.id` is valid
                handle: userData.handle,
                location: userData.location,
                age: userData.age,
                bio: userData.bio,
            };
    
            await callCreate(updatedData);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };
    
    const updateProfile = api.user.updateProfile.useMutation({
        onSuccess: async () => {
            console.log("Profile updated successfully.");
        },
        onError: (error) => {
            console.error("Mutation error:", error);
            alert("An error occurred while updating the profile.");
        },
    });
    
    const callCreate = async (userInput: UserData) => {
        try {
            setPending(true);
            await updateProfile.mutateAsync(userInput);
        } catch (error) {
            console.error("Error in callCreate:", error);
        } finally {
            setPending(false);
        }
    };

    const toggleSettings = () => {
        if(!editMode) void handleSubmit();
        setEditMode(!editMode);
    }

    useEffect(() => {
        if(profile.user.handle) {
            handleChange("handle", profile.user.handle.toString());
        }
        if(profile.user.age) {
            handleChange("age", profile.user.age.toString());
        }
        if(profile.user.location) {
            handleChange("location", profile.user.location.toString());
        }
        if(profile.user.bio) {
            handleChange("bio", profile.user.bio.toString());
        }
        
    }, []);

    return (
        <main>
            <div className="flex flex-row">
                <div className="flex flex-row w-full items-center justify-between p-4 border-b dark:border-slate-800">
                    <div className="flex flex-row items-center">
                    <UserProfileIcon src={profile.user.image}/>
                    <p className="ml-4">Hey {profile.user.name}, Welcome to your Profile! 🎉</p>
                </div>
                <div
                    onClick={() => toggleSettings()} 
                    className="flex w-12 mr-2 flex-col items-center hover:text-aurora-900 dark:text-white cursor-pointer">
                    { !editMode && <CheckIcon className="text-green-500 w-6 h-6 mb-2"></CheckIcon>}
                    { editMode && <Cog6ToothIcon className="w-6 h-6 mb-2"></Cog6ToothIcon>}
                    { !editMode && <small>SAVE</small>}
                    { editMode && <small>SETTINGS</small>}
                </div>
            </div>
        </div>
        <div className={`${pending && 'blur-md'} pl-4 pt-3  pb-6`}>
                <div className="flex flex-row">
                    <div className="flex-1">
                        <div className="flex flex-col mr-4">
                            <label className="text-sm text-slate-600">Handle / Username</label>
                            <input
                                disabled={editMode}
                                value={userData.handle}
                                onChange={(e) => handleChange("handle", e.target.value)}
                                //className="bg-transparent text-lg mr-6 disabled:text-white"
                                placeholder='set your handle'
                                className="p-2 bg-transparent text-black dark:text-white invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 ..."

                                type="text">            
                            </input>
                            <label className="text-sm text-slate-600">Location</label>
                            <input
                                disabled={editMode}
                                value={userData.location}
                                onChange={(e) => handleChange("location", e.target.value)}
                                //className="bg-transparent text-lg mr-6 disabled:text-white"
                                placeholder='set your location'
                                className="p-2 bg-transparent invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 ..."

                                type="text">            
                            </input>
                            <label className="text-sm text-slate-600">Age</label>
                            <input
                                disabled={editMode}
                                value={userData.age}
                                onChange={(e) => handleChange("date", e.target.value)}
                                //className="bg-transparent text-lg mr-6 disabled:text-white"
                                placeholder='13.12.2000'
                                className="p-2 bg-transparent invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
                                type="date">            
                            </input>
                        </div>
                        <small>Email</small>
                        <p className="p-2 text-slate-400">{profile.user.email}</p>
                    </div>
                    <div className="flex-1">   
                        <div className="flex flex-col">
                    <label>Bio</label>
                    <textarea
                    disabled={editMode}
                    value={userData.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    //className="bg-transparent text-lg mr-6 disabled:text-white"
                    placeholder='13.12.2000'
                    className="p-2 h-36 bg-transparent invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
                    >

                        </textarea>
                    <p>{profile.user.bio}</p>
                </div>
            </div>
                            
                </div>
            </div>
        </main>
    );
}