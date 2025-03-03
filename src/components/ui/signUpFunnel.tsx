'use client';

import { BentoBox } from "../elements/box";
import type { User } from "next-auth";
import { Salsa } from "next/font/google";
import { useState } from "react";
import type { FormEvent } from "react";
import { redirect } from "next/navigation";
import { AnimatePresence, motion } from 'framer-motion';
import { api } from "nglty/trpc/react";

const salsa = Salsa({
  weight: '400',
  subsets: ['latin']
});

type SlideVariantsProps = {
  direction: number; // Custom parameter to determine animation direction
};

export const SignUpFunnel = ({ user }: { user: User }) => {
  const [step, setStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  const direction = step > prevStep ? 1 : -1; // Determine animation direction

  const handleNextStep = () => {
    setPrevStep(step);
    if (step < 2) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    setPrevStep(step);
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const slideVariants = {
    enter: (custom: SlideVariantsProps) => ({
      x: custom.direction > 0 ? "0%" : "0%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (custom: SlideVariantsProps) => ({
      x: custom.direction > 0 ? "0%" : "0%",
      opacity: 0,
    }),
  };

  const [formData, setFormData] = useState({
    handle: "",
    location: "",
    age: "",
    bio: "",
  });

  const [handleAvailable, setHandleAvailable] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  

  const checkHandleAvailability = api.user.checkHandleAvailability.useQuery(
    { handle: formData.handle },
    {
        enabled: false, // Prevent the query from running automatically
    } 
  );
  const handleBlur = async () => {
    if (!formData.handle) {
        setHandleAvailable(false);
        return;
    }

    try {
        const response = await checkHandleAvailability.refetch();
        if (response.data?.isAvailable) {
            setHandleAvailable(true);
        } else {
            setHandleAvailable(false);
        }
    } catch (error) {
        console.error("Error checking handle availability:", error);
        setHandleAvailable(false);
    }
};
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(user);
    console.log("Submitting form data: ", formData);
    redirect("/profile/success");
  };

  return (
    <div className="flex flex-col h-full w-screen dark:bg-black dark:text-white">
      {/* Top Row: Title */}
      <header className="flex items-center justify-center pb-2">
      <h1 className={`${salsa.className} text-slate-700 dark:text-gray-300 text-[36px] pt-4`}>
          Complete your Account
        </h1>
      </header>

      {/* Middle Row: Content */}
      <main className="flex-1 p-4 overflow-y-auto m-auto">
      <form onSubmit={(e) => handleSubmit(e)} className="lg:p-6">

<AnimatePresence custom={{ direction }}>

<motion.div
  key={step}
  variants={slideVariants}
  initial="enter"
  animate="center"
  exit="exit"
  custom={{ direction }}
  transition={{ type: "spring", stiffness: 400, damping: 40 }}
  className="relative z-0 w-full relative z-10"
>

{step === 0 && 
  <section className="h-full">
  <div className="text-slate-600 justify-center m-auto text-left md:w-1/2 text-lg lg:text-center">
    <p className="p-2">
      This is your personal space where you can introduce yourself to the network.
    </p>
    <small className="">INFO</small>
    <p className="p-2">Nightly stores your authentication providers information. This information usually contains a picture, name and email-adress</p>
    <p className="p-2">You can use Nightly without providing further information about yourself. In any case, other users cannot see your e-mail adress.</p>
    <p className="p-2">If you choose to opt into the social services, other users can find you by your e-mail adress.</p>

    <p className="p-2 mb-4">Complete your profile to personalize your experience and connect with what matters most. Let’s make your nights unforgettable!</p>
    <input type="checkbox" className="mt-2 p-4"/><span className="pl-3">Agree to platform rules and privacy agreement.</span>
  </div>
  </section>
}
  
{step === 1 && (
  <div className="flex flex-col lg:flex-row md:p-6 lg:p-16">
      <div className="lg:w-1/2 lg:h-full lg:p-12">
        <h1 className={`${salsa.className} text-slate-500 dark:text-gray-300 text-[36px] mb-3`}>
          Choose a User Handle
        </h1>
        <p className="mb-3 dark:text-gray-300">
              Setting a handle makes it easier for others to discover
              you and connect. Without a handle, you are able to lurk
              around the platform anonymously.
        </p>
        <p className="mb-6 dark:text-gray-300">
              By setting up a handle, you can participate in various
              activities.
        </p>
        <p className="dark:text-gray-300 text-bold text-xs">
              If you choose to just lurk around, opt out <u>here</u>.
        </p>
      </div>
          <BentoBox className="p-6 mt-6 lg:mt-24 lg:mb-72">
            <div>
              <label
                htmlFor="handle"
                className="block text-sm font-medium text-gray-700"
              >
                User Handle
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Your unique identifier on the platform. Must be between
                3-15 characters.
              </p>
              <div className="flex items-center space-x-4 dark:text-slate-500">
                <input
                  id="handle"
                  name="handle"
                  type="text"
                  placeholder="Enter your handle"
                  value={formData.handle}
                  onChange={(e) =>
                    handleChange("handle", e.target.value)
                  }
                  onBlur={handleBlur}
                  className="flex-grow block w-full rounded-md border-gray-300 border-2 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex flex-row justify-between mt-6">
                {handleAvailable !== null && (
                  <p
                    className={`mt-2 text-sm ${
                      handleAvailable
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {handleAvailable
                      ? "Handle is available!"
                      : "Handle is already taken. Please choose another."}
                  </p>
                )}
                <button
                  type="button"
                  className="bg-aurora-900 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleBlur}
                >
                  Check Availability
                </button>
              </div>
            </div>
          </BentoBox>
        </div>
      )}
      {step === 2 && (
        <BentoBox className="p-6" animated>
          <p className="text-sm dark:text-gray-300 mt-2 mb-2">Tell us a little more about yourself!</p>
          <p className="text-xs text-gray-500 mb-2">
            Other users can see your information when visiting your profile.
          </p>
          <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Where are you located?"
                value={formData.location}
                onChange={(e) =>
                  handleChange("location", e.target.value)
                }
                className="flex-grow block w-full rounded-md border-gray-300 border-2 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mt-3">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                className="flex-grow block w-full rounded-md border-gray-300 border-2 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mt-3">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                placeholder="Tell us a little about yourself"
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="flex-grow block w-full rounded-md border-gray-300 border-2 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          <button
            type="submit"
            className="mt-3 w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Profile
          </button>
        </BentoBox>
      )}
    </motion.div>

    </AnimatePresence>
            
    </form>

    </main>
      {/* Bottom Row: Navigation Buttons */}
      <footer className="flex items-center w-full justify-center mb-12 lg:mb-32 p-4">
        <div className="rounded-2xl bg-gray-100 dark:bg-slate-900 border border-gray-300 dark:border-slate-800 p-4 gap-6 shadow-lg w-72 flex flex-row justify-between">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 w-32 py-2 rounded disabled:bg-gray-400"
            onClick={handlePreviousStep}
            disabled={step === 0}
          >
            Previous
          </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 w-32 py-2 rounded disabled:bg-gray-400"
                onClick={handleNextStep}
                disabled={step === 2 || (step === 1 && !formData.handle) || (step === 1 && !handleAvailable && formData.handle !== undefined)}
                >
                Next
              </button>

        </div>
      </footer>
    </div>
  );
};