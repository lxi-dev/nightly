'use client';

import React, { useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate, animate } from "framer-motion";

interface AurorasBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}


const COLORS = ["#13FFAA", "#1E67C6", "#CEB4CF", "#DD335C"];
export const AurorasBackground: React.FC<AurorasBackgroundProps> = ({children}) => {
const color = useMotionValue(COLORS[0]);
const backgroundImage = useMotionTemplate`radial-gradient(125% 50% at 100% 100%, ${color} -100%, #000 100%)`;

useEffect(() => {
    animate(color, COLORS, {
        ease: "easeInOut",
        duration: 25,
        repeat: Infinity,
        repeatType: "mirror",
        });
    }, []);

return (
    <motion.section
        style={{
          backgroundImage,
        }}
        className="w-full h-full inset-0"
    >{children}</motion.section>
);
}