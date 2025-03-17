// components/LoadingOverlay.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingOverlay: React.FC = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingOverlay;