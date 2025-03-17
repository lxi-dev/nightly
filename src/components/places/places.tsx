'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartPlaceList } from "./heartplaces-list";
import { PlaceList } from "./places-list";
import YourPlaceCard from "./your-place-card";

type Props = {
    userId: string;
}

export const PlacesComponent: React.FC<Props> = ({ userId  }) => {
  const [activeTab, setActiveTab] = useState("around");

  // Tabs configuration
  const tabs = [
    { id: "around", label: "Around you", content: <PlaceList /> },
    { id: "heartplaces", label: "Heartplaces", content: <HeartPlaceList /> },
    { id: "myplace", label: "My Place", content: <YourPlaceCard userId={userId}/> },
  ];


  const getTabDimensions = (id: string) => {
    const tabElement: HTMLElement | null = document.querySelector(`[data-tab-id="${id}"]`);
    return tabElement ? { width: tabElement.offsetWidth, left: tabElement.offsetLeft } : { width: 0, left: 0 };
  };

  const { width, left } = getTabDimensions(activeTab);
  return (
    <div className="h-full w-full gap-4 p-2">
      {/* Tabs */}
      <div className="relative flex flex-row gap-6">
        {tabs.map((tab) => (
          <h2
            key={tab.id}
            data-tab-id={tab.id}
            className={`text-xl cursor-pointer ${
              activeTab === tab.id ? "dark:text-white" : "dark:text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </h2>
        ))}
        {/* Animated Underline */}
        <motion.div
          className="absolute bottom-0 h-1 bg-aurora-900 rounded"
          layoutId="underline"
          initial={true}
          animate={{
            width,
            x: left,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      <small className="text-gray-500 dark:text-gray-600">
        Around you is currently locked to Bremen.
      </small>

      {/* Content with fade animations */}
      <div className="mt-4">
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {tab.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}