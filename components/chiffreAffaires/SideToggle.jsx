import React from 'react';

export default function SideToggle({ infoType, toggleInfoType }) {
  return (
    <div className="max-w-md mx-auto flex justify-center items-center pb-1">
      <div className="mt-1 flex rounded-md space-x-4 items-center w-full text-center">
        
        {/* Left label */}
        <p
          className={`cursor-pointer text-xs font-medium flex-grow truncate whitespace-nowrap text-gray-700`}
          onClick={() => toggleInfoType('globales')}
        >
          Informations globales
        </p>

        {/* Toggle button */}
        <div className="inline-flex items-center px-4 text-gray-500 text-sm flex-shrink-0">
          <button
            type="button"
            className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent bg-gray-300 rounded-full cursor-pointer transition-colors ease-in-out duration-200"
            role="switch"
            aria-checked={infoType === 'commerces'}
            onClick={() => toggleInfoType(infoType === 'globales' ? 'commerces' : 'globales')}
          >
            <span
              aria-hidden="true"
              className={`${
                infoType === 'commerces' ? 'translate-x-5' : 'translate-x-0'
              } pointer-events-none inline-block h-5 w-5 rounded-full bg-teal-500 shadow transform ring-0 transition ease-in-out duration-200`}
            />
          </button>
        </div>

        {/* Right label */}
        <p
          className={`cursor-pointer text-xs font-medium flex-grow truncate whitespace-nowrap text-gray-700`}
          onClick={() => toggleInfoType('commerces')}
        >
          Informations par commerces
        </p>
      </div>
    </div>
  );
}
