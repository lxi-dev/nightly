import React from 'react';

interface TextBoxProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

/**
 * A reusable TextBox (textarea) component.
 * @param {string} label - The label for the text box.
 * @param {string} name - The name attribute for the text box.
 * @param {string} value - The value of the text box.
 * @param {function} onChange - Function to handle text box change.
 * @param {boolean} required - Whether the text box is required.
 */
const TextAreaInput: React.FC<TextBoxProps> = ({
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
      <textarea
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

export default TextAreaInput;