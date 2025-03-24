'use client';

import { type ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

type TabProps = {
  id: string;
  label: string;
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
};

type TabsProps = {
  children: ReactNode;
  defaultActiveTab?: string; // Allows specifying the initial active tab
};

type TabContentProps = {
  children: ReactNode;
};

export const Tabs: React.FC<TabsProps> = ({ children, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultActiveTab ?? (React.Children.toArray(children)[0] as React.ReactElement<TabProps>)?.props.id ?? ""
  );

  const getTabDimensions = (id: string) => {
    const tabElement: HTMLElement | null = document.querySelector(`[data-tab-id="${id}"]`);
    return tabElement ? { width: tabElement.offsetWidth, left: tabElement.offsetLeft } : { width: 0, left: 0 };
  };

  const { width, left } = getTabDimensions(activeTab);

  return (
    <div className="h-full w-full gap-4">
      <div className="relative flex flex-row gap-6 border-b border-gray-300 dark:border-gray-700 pb-2">
        {children &&
          React.Children.map(children, (child) => {
            if (React.isValidElement<TabProps>(child)) {
              return React.cloneElement(child, {
                isActive: activeTab === child.props.id,
                onClick: () => setActiveTab(child.props.id),
              });
            }
            return null;
          })}
        <motion.div
          className="absolute -bottom-1 h-1 bg-aurora-900 rounded"
          layoutId="underline"
          initial={true}
          animate={{
            width,
            x: left,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
      <div className="mt-4">
        <AnimatePresence mode="wait">
          {children &&
            React.Children.map(children, (child) => {
              if (React.isValidElement<TabProps>(child) && activeTab === child.props.id) {
                return (
                  <motion.div
                    key={child.props.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {child.props.children}
                  </motion.div>
                );
              }
              return null;
            })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const Tab: React.FC<TabProps> = ({ id, label, isActive, onClick }) => (
  <h2
    data-tab-id={id}
    className={`text-xl cursor-pointer ${isActive ? "dark:text-white" : "dark:text-gray-500"}`}
    onClick={onClick}
  >
    {label}
  </h2>
);

export const TabContent: React.FC<TabContentProps> = ({ children }) => <>{children}</>;