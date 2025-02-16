'use client';

import { motion } from "motion/react";

const bentoClass = "flex rounded-3xl border flex-col bg-gray-50 dark:bg-aurora dark:border-slate-800"


export const BentoBox = ({ colSpan, rowSpan, children, classes, animated}: { colSpan: string, rowSpan: string, children: React.ReactNode, classes?: string, animated?: boolean }) => {
    
    return (
        animated ? (
        <motion.div
        initial={{ transform: "translateY(50px)", opacity: 0 }}
        animate={{ transform: "translateY(0px)", opacity: 1 }}
        transition={{ duration: 0, type: "spring" }}
            className={`${bentoClass} col-span-${colSpan} row-span-${rowSpan} ${classes ?? 'hover:border-aurora-900'}`}
        >
            {children}
        </motion.div>
        ) : (
            <div
                className={`${bentoClass} col-span-${colSpan} row-span-${rowSpan} ${classes ?? 'hover:border-aurora-900'}`}
            >
                {children}
            </div> 
        )
    );
  };