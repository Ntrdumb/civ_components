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
      <div>
        {/* Conditionally render components based on infoType */}
        {infoType === 'globales' ? <HistoInfo /> : <HistoInfoCommerces />}
      </div>
    </div>
  );
}
