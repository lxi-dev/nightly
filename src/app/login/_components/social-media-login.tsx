'use client';
import { motion } from "motion/react";
import { signIn } from "next-auth/react";
import React from "react";

const SocialMediaLogin = () => {

    const handleGoogleLogin = async () => {
        await signIn("google");
    }
  return (
    <div className="flex justify-center items-center space-x-4 w-72">
      <motion.button
        className="flex items-center h-12 rounded-md border border-gray-100 dark:border-gray-900 text-black hover:text-white shadow-lg hover:bg-aurora-900 focus:ring-2 focus:ring-blue-200 py-2 px-4"
        aria-label="Login with Google"
        onClick={handleGoogleLogin}
      >
        <svg fill="currentColor" height="24px" width="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
	 viewBox="0 0 210 210">
            <path d="M0,105C0,47.103,47.103,0,105,0c23.383,0,45.515,7.523,64.004,21.756l-24.4,31.696C133.172,44.652,119.477,40,105,40
	c-35.841,0-65,29.159-65,65s29.159,65,65,65c28.867,0,53.398-18.913,61.852-45H105V85h105v20c0,57.897-47.103,105-105,105
	S0,162.897,0,105z"/>
</svg><p className="pl-4">Sign in with Google</p>
    </motion.button>
    </div>
  );
};

export default SocialMediaLogin;
