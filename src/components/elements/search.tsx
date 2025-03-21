/* eslint-disable */
'use client';
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";

const Search = ({ label = "search", id = '1', type = "text", ...props }) => {
    const [value, setValue] = useState("");

    const handleChange = (e: any) => {
      setValue(e.target.value);
    };
  
    return (
      <div className="relative w-full rounded-md flex-row flex">
        {/* <label
          htmlFor={id}
          className={`absolute text-center gap-4 items-center left-6 top-1/2 transform -translate-y-1/2 text-lg text-gray-800 dark:text-slate-600 transition-all duration-200 ease-in-out 
            ${value ? "-top-5 text-violet-700" : "peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500"}`}
        >
          {value.length === 0 && <span className="flex flex-row gap-4 items-center "  >{label}</span>}
        </label> */}
        <SearchIcon className="w-5 h-5"/>
        <input
          id={id}
          type={type}
            placeholder="Search events, places, or people"
            className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
          value={value}
          onChange={handleChange}
          {...props}
        />
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-100"></div>
      </div>
    );
  };

export default Search;