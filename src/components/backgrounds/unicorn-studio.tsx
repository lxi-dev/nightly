'use client';

import React, { useEffect } from "react";

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean;
      init?: () => void;
    };
  }
}

const UnicornStudioComponent: React.FC = () => {
  useEffect(() => {
    // Check if UnicornStudio is already initialized
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false };
      const script = document.createElement("script");
      script.src = "https://cdn.unicorn.studio/v1.4.0/unicornStudio.umd.js";
      script.onload = () => {
        if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
          if (!window.UnicornStudio?.init?.()) return;
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      document.head.appendChild(script);
    }
  }, []); // Run this effect only once when the component mounts

  return (
    <div
      data-us-project="wrVS8wjtBY3BsqAmbLLp"
    //   style={{ width: "1440px", height: "900px" }}
    className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};

export default UnicornStudioComponent;