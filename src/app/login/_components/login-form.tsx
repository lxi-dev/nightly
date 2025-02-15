/* eslint-disable */

'use client';
 
import {
  AtSymbolIcon,
  KeyIcon,
  ArrowRightIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { signIn } from 'nglty/server/auth';
import { authenticate } from 'nglty/server/auth/actions';
import { useActionState } from 'react';
 
export default function LoginForm() {
  const [errorMessage, formAction, _isPending] = useActionState(
    authenticate,
    undefined,
  );
 //
  return (
    <main className='dark'>
    <form action={formAction} className="space-y-3 dark:text-white ">
      {/* <div className="flex-grow h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-100"></div>
      <span className="mx-4 text-neutral-500 dark:text-neutral-400 text-sm">ANMELDEN</span>
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-100"></div> */}
    {/* </div> */}
        <div className="flex-col m-auto align-center w-72 flex">  
          <div>
            <label
              className="mb-1 mt-0 block text-xs font-medium text-black dark:text-white"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                disabled={true}
                className="peer block w-full disabled:bg-zink-800 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 bg-zink-900"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-3">
            <label
              className="mb-1 mt-0 block text-xs font-medium text-black dark:text-white"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                disabled={true}

                className="peer block w-full rounded-md border border-gray-200 disabled:bg-zink-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            </div>
            <p className='font-light text-xs text-center mt-4'>Noch keinen Account? Jetzt <a className='underline hover:text-purple-600' href='/register'>Anmelden!</a></p>
        
       {/*
        <div className='mt-4'>
        <motion.button 
         whileHover={{ opacity: 0 }}
         onHoverStart={event => {}}
         onHoverEnd={event => {}}
         onClick={() => signIn("credentials")}
         aria-disabled={true}
         className="mt-4 w-full dark:bg-white dark:text-black dark:disabled:bg-zink-800 items-center justify-center rounded-md"
          >
            <span className="p-2 font-light text-center flex flex-row items-center justify-center">
            <ArrowRightIcon className="ml-4 w-5 h-5 text-black" />
            </span>
          </motion.button>
          </div>
        */}
        <div
          className="flex h-6 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        </div>
    </form>
    </main>
  );
}