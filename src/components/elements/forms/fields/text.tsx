import React from 'react';
import type { ChangeEvent } from 'react';
interface TextInputProps {
  label: string;
  name: string;
  value: string;
  defaultValue?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

/**
 * A reusable TextInput component.
 * @param {string} label - The label for the input.
 * @param {string} name - The name attribute for the input.
 * @param {string} value - The value of the input.
 * @param {string} defaultValue - The default value of the input.
 * @param {function} onChange - Function to handle input change.
 * @param {boolean} required - Whether the input is required.
 * @param {boolean} disabled - Weather the input is disabled.
 */
const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  defaultValue = '',
  onChange,
  required = false,
  disabled = false
}) => {
  return (
    <div>
      <label className="block text-gray-700 dark:text-gray-300" htmlFor={name}>
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className="flex-grow block w-full rounded-md dark:bg-aurora dark:border-gray-700 dark:text-white border-gray-300 border-2 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default TextInput;