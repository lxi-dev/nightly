"use client";

import { AurorasBackground } from "nglty/components/backgrounds/auroras";
import { StarsBackground } from "nglty/components/backgrounds/stars";
import SocialMediaLogin from "../../app/login/_components/social-media-login";
import LogoCubicle from "../elements/logo/logo-cubicle";

export function SignInScreen() {

  return (
    <div className="flex h-screen flex-col-reverse md:p-24">
      <div className="w-full min-h-1/4 bg-white md:h-full dark:bg-aurora shadow-lg dark:text-white flex justify-center md:justify-start flex-col items-center pb-4 pt-4">
        {/* <LoginForm /> */}
        <div className="my-auto">
        <SocialMediaLogin />

        </div>
      </div>

      {/* Right Side */}
      <div 
        className="w-full h-full md:h-full flex justify-center items-center relative"
      >
        {/* Right side can hold any additional content */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-0 bg-black dark:bg-white">
          <AurorasBackground>
          <StarsBackground />

          </AurorasBackground >
          </div>
        </div>
        {/* Foreground Content */}
        <div className="relative z-10 text-center">
          <div className="flex justify-center flex-col items-center">
          <div className="font-semibold text-xl flex items-center space-x-2">
                <LogoCubicle />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-violet-400">
                    Nightly
                </span>
            </div>
          <p className="text-lg text-gray-300">Explore the universe with us</p>
        </div>
        </div>
      </div>
</div>
  );
}
