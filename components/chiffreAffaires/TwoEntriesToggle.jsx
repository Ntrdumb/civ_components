import { useState, forwardRef, useImperativeHandle } from 'react';

// Forward the ref to the parent to allow access to internal methods 
// (Ex: use a ref to get this component then do .getSelectedOption to get the selected option) (Projet.jsx)
const TwoEntriesToggle = forwardRef(({ options }, ref) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  // Toggles the option between the two available options
  const toggleOption = () => {
    const newOption = selectedOption === options[0] ? options[1] : options[0];
    setSelectedOption(newOption);
  };

  // Allows the parent to get the currently selected option
  useImperativeHandle(ref, () => ({
    getSelectedOption: () => selectedOption
  }));

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
});

export default TwoEntriesToggle;
