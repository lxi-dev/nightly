'use client';
import { PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react"
import Link from "next/link";

export const BigButton = ({backgroundImage, redirect} : { backgroundImage?: string, redirect:string}) => {
    return (
        <Link href={redirect}>
        <motion.div 
            whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}         
        id='create-button'
        style={{backgroundImage: backgroundImage, backgroundSize:'contain'}}
        className="shadow-sm w-20 h-20 rounded-md flex items-center justify-center relative dark:invert">
            <div className="absolute z-20">

                <PlusIcon className="text-aurora-900 dark:text-aurora-900 z-20" />
            </div>
            <img src={backgroundImage} className="opacity-50 dark:opacity-100 hover:opacity-100 z-0 relative"/> 
        </motion.div>
    </Link>
    );
};
