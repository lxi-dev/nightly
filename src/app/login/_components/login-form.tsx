'use client';
 
import {
  AtSymbolIcon,
  KeyIcon,
  ArrowRightIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { authenticate } from 'nglty/server/auth/actions';
import { useActionState } from 'react';
 
export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
 //
  return (
    <main className=''>
    <form   action={formAction} className="space-y-3 ">
      <div className="w-100 p-6 bg-white border border-gray-200 bg-white rounded-lg shadow dark:border-gray-700 z-20">
      <div className='text-black text-center mt-4'>
        <h3 className='text-xl'>Willkommen bei Nightly! 🌙</h3>
        <p className='mt-4 text-sm'>Einem Netzwerk zum  <br></br>rausgehen und zurückholen.</p>
        <p className='text-xs font-semibold text-slate-600 mt-8 mb-4'>Anmelden</p>
      </div>
        <div className="flex-col m-auto align-center w-72 flex">  
          <div>
            <label
              className="mb-3 mt-3 block text-xs font-medium text-black"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-2">
            <label
              className="mb-1 block text-xs font-medium text-black"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
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
        </div>
        <div className='mt-12'>
        <button className="mt-4 w-full" aria-disabled={isPending}>
            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </button>
          </div>

        <p className='font-light text-xs text-center mt-4'>Noch keinen Account? Jetzt <a className='underline hover:text-purple-600' href='/register'>Anmelden!</a></p>
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