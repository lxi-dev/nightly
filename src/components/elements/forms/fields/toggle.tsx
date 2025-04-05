import React from 'react';
import { motion } from 'framer-motion';

interface ToggleInputProps {
  label: string;
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
  required?: boolean;
}

/**
 * A reusable ToggleInput component.
 * @param {string} label - The label for the toggle.
 * @param {string} name - The name attribute for the toggle.
 * @param {boolean} value - The current state of the toggle.
 * @param {function} onChange - Function to handle toggle state changes.
 * @param {boolean} required - Whether the toggle is required.
 */
const ToggleInput: React.FC<ToggleInputProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
}) => {
  const handleToggle = () => onChange(!value);

  return (
    <div className="flex flex-row items-center">
      <div className="flex justify-center items-center">
        <motion.div
          id={name}
          className={`relative w-14 h-6 rounded-full ${
            value ? 'bg-violet-300' : 'bg-gray-300 dark:bg-gray-700'
          } cursor-pointer`}
          whileHover={{ scale: 1.009 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.div
            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
            animate={{ x: value ? '200%' : 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>
      <label className="pl-4 block text-gray-700 dark:text-gray-300" htmlFor={name}>
        {label}
      </label>
      </div>
      {required && !value && (
        <span className="text-red-500 text-sm mt-1">This field is required.</span>
      )}
    </div>
  );
};

export default ToggleInput;
