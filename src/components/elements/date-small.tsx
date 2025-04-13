import { motion } from "framer-motion";

export const DateSmallSquare = ({ date } : {date : Date}) => {
    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleDateString("en-US", { month: "short" });
    // const year = new Date(date).getFullYear();
    return (
        <motion.div
        className={`relative w-16 h-16 bg-gradient-to-br dark:from-aurora from-white to-violet-700 dark:to-violet-700 text-white flex flex-col items-center justify-baseline rounded-lg shadow-md overflow-hidden`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* <div className="text-6xl font-bold absolute -translate-x-24 text-white/20">
          {year}
        </div> */}
        <motion.div
          className="relative text-3xl font-bold mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {day}
        </motion.div>
        <motion.div
          className="relative mx-auto text-sm font-semibold bg-white text-gray-800 px-2 rounded-md"
          whileHover={{ scale: 1.1, backgroundColor: "#d1fae5" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {month}
        </motion.div>
      </motion.div>
    );
  };