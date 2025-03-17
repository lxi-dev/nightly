import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface CSVInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

/**
 * A reusable CSVInput component for creating comma-separated values.
 * @param {string} label - The label for the input.
 * @param {string} name - The name attribute for the input.
 * @param {string} value - The comma-separated values as a string.
 * @param {function} onChange - Function to handle CSV changes.
 * @param {boolean} required - Whether the input is required.
 */
const CSVInput: React.FC<CSVInputProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
}) => {
  const [fields, setFields] = useState<string[]>(value.split(',').filter(Boolean));

  const handleFieldChange = (index: number, newValue: string) => {
    const updatedFields = [...fields];
    updatedFields[index] = newValue;
    setFields(updatedFields);
    onChange(updatedFields.filter(Boolean).join(','));
  };

  const addField = () => {
    setFields([...fields, '']);
  };

  return (
    <div>
      <label className="block text-gray-700 dark:text-gray-300" htmlFor={name}>
        {label}
      </label>
      {fields.map((field, index) => (
        <div key={index} className="flex items-center mt-2">
          <input
            type="text"
            name={`${name}-${index}`}
            value={field}
            onChange={(e) => handleFieldChange(index, e.target.value)}
            className="flex-grow block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-aurora dark:text-white border-2 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required={required}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addField}
        className="mt-2 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        aria-label="Add field"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default CSVInput;
