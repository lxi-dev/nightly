import React from 'react';

interface PickerOption {
  value: string;
  label: string;
}

interface PickerProps {
  label: string;
  name: string;
  value: string;
  options: PickerOption[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

/**
 * A reusable Picker (dropdown) component.
 * @param {string} label - The label for the picker.
 * @param {string} name - The name attribute for the picker.
 * @param {string} value - The selected value of the picker.
 * @param {PickerOption[]} options - Array of options for the picker.
 * @param {function} onChange - Function to handle option change.
 * @param {boolean} required - Whether the picker is required.
 */
const DropdownInput: React.FC<PickerProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  required = false,
}) => {
  return (
    <div>
      <label className="block text-gray-700 dark:text-gray-300" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="flex-grow block w-full rounded-md border-gray-300 dark:border-gray-700 dark:text-white dark:bg-aurora border-2 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownInput;
