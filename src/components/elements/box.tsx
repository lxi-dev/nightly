'use client';

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const bentoClass = "flex rounded-3xl border flex-col bg-gray-50 dark:bg-aurora dark:border-slate-800"


export const BentoBox = ({ colSpan, rowSpan, children, className, animated, hover}: { colSpan?: string, rowSpan?: string, children: React.ReactNode, className?: string, animated?: boolean, hover?: boolean}) => {
    const [hoverState, setHover] = useState(true);

    useEffect(() => {
        if(!hover) return;
        setHover(hover);
    }, [hover])

    return (
        animated ? (
        <motion.div
        initial={{ transform: "translateY(50px)", opacity: 0 }}
        animate={{ transform: "translateY(0px)", opacity: 1 }}
        whileHover={hoverState ? { scale: 1.1, rotate: 5 } : undefined}
        transition={{ duration: 0.7, type: "spring" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`${className ?? ''} ${bentoClass} ${colSpan ? `col-span-${colSpan}`: ''} ${rowSpan ? `row-span-${rowSpan}` : ''}`}
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