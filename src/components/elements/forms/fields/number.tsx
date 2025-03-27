import type { ChangeEvent } from "react";

interface NumberInputProps {
    label: string;
    name: string;
    value: number;
    defaultValue?: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
  }

  /**
 * A reusable NumberInput component.
 * @param {string} label - The label for the input.
 * @param {string} name - The name attribute for the input.
 * @param {number} value - The value of the input.
 * @param {number} defaultValue - The default value of the input.
 * @param {function} onChange - Function to handle input change.
 * @param {boolean} required - Whether the input is required.
 */
const NumberInput: React.FC<NumberInputProps> = ({
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
          type="number"
          id={name}
          name={name}
          value={value}
          min={0}
          onChange={onChange}
          className="flex-grow block w-full rounded-md border-gray-300 dark:border-gray-700 dark:text-white dark:bg-aurora border-2 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm appearance-none"
          required={required}
          style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
        />
      </div>
    );
  };

  export default NumberInput;