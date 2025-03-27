import clsx from 'clsx';
import React from 'react';

interface PickerOption {
  id: string;
  label: string;
  description: string;
}

interface PickerInputProps {
  options: PickerOption[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * A reusable PickerInput component for selecting an option.
 * @param {PickerOption[]} options - The options to display.
 * @param {string} value - The current selected value.
 * @param {function} onChange - Callback function when an option is selected.
 */
const PickerInput: React.FC<PickerInputProps> = ({ options, value, onChange }) => {
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {options.map((option) => (
        <div
          key={option.id}
          onClick={() => onChange(option.id)}
          className={clsx(
            "border rounded-lg p-4 cursor-pointer transition-all",
            value === option.id
              ? "border-violet-500 bg-violet-50"
              : "border-gray-200 hover:border-gray-300"
          )}
        >
          <div className="font-medium text-gray-800">{option.label}</div>
          <div className="text-sm text-gray-500">{option.description}</div>
        </div>
      ))}
    </div>
  );
};

export default PickerInput;
