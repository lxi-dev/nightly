"use client";

import { AurorasBackground } from "nglty/components/backgrounds/auroras";
import { StarsBackground } from "nglty/components/backgrounds/stars";
import Logo from "nglty/components/elements/logo/logo";
import LoginForm from "../login/_components/login-form";
import SocialMediaLogin from "../login/_components/social-media-login";

// import { useState } from "react";

// import { api } from "nglty/trpc/react";

export function SignInScreen() {
  // const [latestPost] = api.post.getLatest.useSuspenseQuery();

  // const utils = api.useUtils();
  // const [name, setName] = useState("");
  // const createPost = api.post.create.useMutation({
  //   onSuccess: async () => {
  //     await utils.post.invalidate();
  //     setName("");
  //   },
  // });

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 s:w-screen s:h-1/2 dark:bg-black shadow-lg dark:text-white flex flex-col justify-center items-center p-8 ">
      {/* <div className='text-black dark:text-white text-center mt-4'>
        <h3 className='text-xl'>Willkommen bei Nightly! 🌙</h3>
        <p className='mt-4 text-sm'>Dinem Netzwerk zum  <br></br>rausgehen und zurückholen.</p>
      </div> */}
        <LoginForm />
        <SocialMediaLogin />
      </div>

      {/* Right Side */}
      <div 
        className="w-1/2 flex justify-center items-center relative"
      >
        {/* Right side can hold any additional content */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-0">
          <AurorasBackground className="blur-md">
          <StarsBackground />

          </AurorasBackground >
          </div>
        </div>
        {/* Foreground Content */}
        <div className="relative z-10 text-center">
          <div className="flex justify-center flex-col items-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            <Logo />
          </h1>
          <p className="text-lg text-gray-300">Explore the universe with us</p>
        </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-24 flex flex-col items-center justify-center">
  <span className="text-gray-700 mb-2">Click the button below</span>
  <button className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300">
    testi
  </button>
</div>
</div>
  );
}
