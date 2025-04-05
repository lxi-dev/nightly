'use client';

import { motion } from "motion/react";

export const bentoClass = "flex flex-col dark:text-white dark:bg-aurora border xl:border-2 border-gray-300 dark:border-gray-700 shadow-lg rounded-2xl"


export const BentoBox = ({ colSpan, rowSpan, children, className, animated, hover}: { colSpan?: string, rowSpan?: string, children: React.ReactNode, className?: string, animated?: boolean, hover?: boolean}) => {

    return (
        animated ? (
        <motion.div
        initial={{ transform: "translateY(50px)", opacity: 0 }}
        animate={{ transform: "translateY(0px)", opacity: 1 }}
        whileHover={hover ? { transform: "translateY(-2px)" } : undefined}
        transition={{ duration: 0.7, type: "spring" }}
        className={`${className ?? ''} ${bentoClass} ${colSpan ? `col-span-${colSpan}`: ''} ${rowSpan ? `row-span-${rowSpan}` : ''} ${hover ? 'hover:shadow-xl' : ''}`}
        >
            {children}
        </motion.div>
        ) : (
            <div
                className={`${className ?? 'hover:border-aurora-900'} ${bentoClass} ${colSpan ? `col-span-${colSpan}`: ''} ${rowSpan ? `row-span-${rowSpan}` : ''}`}
            >
                {children}
            </div> 
        )
    );
  };