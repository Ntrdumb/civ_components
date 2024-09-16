import { useState } from 'react';

export default function TwoEntriesToggle({ options = ['$ CAD', '€ EUR'], onToggle }) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleOption = () => {
    const newOption = selectedOption === options[0] ? options[1] : options[0];
    setSelectedOption(newOption);
    if (onToggle) onToggle(newOption); // Call the callback function when toggled
  };

  return (
    <div className="max-w-md mx-auto ml-3">
      <div className="mt-1 flex rounded-xl shadow-sm">
        <button
          type="button"
          className="relative inline-flex items-center justify-between w-28 h-8 p-1 border border-gray-300 rounded-xl cursor-pointer transition-all duration-300 text-xs"
          onClick={toggleOption}
        >
          {/* Background slider */}
          <span
            className={`absolute left-0 top-0 h-full w-1/2 rounded-xl bg-gray-300 transform transition-all duration-300 ${
              selectedOption === options[1] ? 'translate-x-full' : 'translate-x-0'
            }`}
          />

          {/* First option */}
          <span
            className={`relative w-1/2 text-center transition-all duration-300 ${
              selectedOption === options[0] ? 'text-white font-semibold' : 'text-gray-700'
            }`}
          >
            {options[0]}
          </span>

          {/* Second option */}
          <span
            className={`relative w-1/2 text-center transition-all duration-300 ${
              selectedOption === options[1] ? 'text-white font-semibold' : 'text-gray-700'
            }`}
          >
            {options[1]}
          </span>
        </button>
      </div>
    </div>
  );
}
