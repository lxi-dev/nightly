/* eslint-disable */
'use client';
import React, { useState } from "react";

const Search = ({ label = "label", id = '1', type = "text", ...props }) => {
    const [value, setValue] = useState("");

    const handleChange = (e: any) => {
      setValue(e.target.value);
    };
  
    return (
      <div className="relative w-full">
        <label
          htmlFor={id}
          className={`absolute left-6 top-1/2 transform -translate-y-1/2 text-xl text-gray-800 transition-all duration-200 ease-in-out 
            ${value ? "-top-5 text-blue-500" : "peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500"}`}
        >
          {label}
        </label>
        <input
          id={id}
          type={type}
          className="peer block w-full h-12 px-6 text-lg text-gray-800 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none"
          placeholder=" "
          value={value}
          onChange={handleChange}
          {...props}
        />
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-100"></div>
      </div>
    );
  };

export default Search;