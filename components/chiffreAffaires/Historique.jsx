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

  return (
    <div>
      {/* Pass infoType and toggle function to SideToggle */}
      <SideToggle infoType={infoType} toggleInfoType={toggleInfoType} />

      {/* Content */}
      <div className="relative">
        {/* Both components are rendered, but only one is shown at a time using CSS */}
        <div className={`${infoType === 'globales' ? 'block' : 'hidden'}`}>
          {console.log("HistoInfo")} 
          <HistoInfo />
        </div>
        <div className={`${infoType === 'commerces' ? 'block' : 'hidden'}`}>
          {console.log("HistoInfoCommerces")} 
          <HistoInfoCommerces />
        </div>
      </div>
    </div>
  );
}
