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
      <div className="rounded-md flex-row flex w-2xl space-x-3">
        <SearchIcon className="w-4 h-4 text-gray-400 m-auto"/>
        <input
          id={id}
          type={type}
          placeholder="Search events, places, or people"
          className="bg-transparent w-96"
          value={value}
          onChange={handleChange}
          disabled
          {...props}
        />
      </div>
    );
  };

export default Search;