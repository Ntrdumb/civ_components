import React, { useState } from 'react';
import SideToggle from './SideToggle';
import HistoInfo from './HistoInfo';
import HistoInfoCommerces from './HistoInfoCommerces';

export default function Historique() {
  const [infoType, setInfoType] = useState('globales'); // Manage state here

  // Function to toggle infoType
  const toggleInfoType = (newType) => {
    setInfoType(newType);
  };

  function getEverything() {
    console.log("Mon Historique: " + infoType);
  }

  return (
    <div>
      {/* <button className="bg-white p-1.5 rounded-md border border-gray-300 text-gray-500 hover:text-gray-700 fixed right-0"
          onClick={getEverything}>
          Get it
      </button> */}
      {/* Pass infoType and toggle function to SideToggle */}
      <SideToggle infoType={infoType} toggleInfoType={toggleInfoType} />

      {/* Content */}
      <div className="relative">
        {/* Both components are rendered, but only one is shown at a time using CSS */}
        <div className={`${infoType === 'globales' ? 'block' : 'hidden'}`}>
          <HistoInfo />
        </div>
        <div className={`${infoType === 'commerces' ? 'block' : 'hidden'}`}>
          <HistoInfoCommerces />
        </div>
      </div>
    </div>
  );
}
