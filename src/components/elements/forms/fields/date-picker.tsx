import React from 'react';

interface DateInputProps {
  label: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

/**
 * A reusable DateInput component.
 * @param {string} label - The label for the date input.
 * @param {string} name - The name attribute for the date input.
 * @param {string} value - The value of the date input in YYYY-MM-DD format.
 * @param {function} onChange - Function to handle date input change.
 * @param {boolean} required - Whether the date input is required.
 */
const DateInput: React.FC<DateInputProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div>
      <label className="block text-gray-700 dark:text-gray-300" htmlFor={name}>
        {label}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="flex-grow block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-aurora dark:text-white border-2 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        required={required}
      />
    </div>
  );
};

export default DateInput;
