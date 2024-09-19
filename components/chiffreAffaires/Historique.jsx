import React, { useState, useRef } from 'react';
import { CommerceProvider } from './CommerceContext';
import SideToggle from './SideToggle';
import HistoInfo from './HistoInfo';
import HistoInfoCommerces from './HistoInfoCommerces';

export default function Historique() {
  const [infoType, setInfoType] = useState('globales'); // Manage state here
  const histoInfoRef = useRef();
  const histoInfoCommercesRef = useRef();

  // Toggles infoType
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
        <div
          ref={histoInfoRef}
          className={`${infoType === 'globales' ? 'block' : 'hidden'}`}
        >
          {/* {console.log("HistoInfo")} */}
          <HistoInfo />
        </div>

        <div
          ref={histoInfoCommercesRef}
          className={`${infoType === 'commerces' ? 'block' : 'hidden'}`}
        >
          {/* Will differientiate between the HistoInfo above and the HistoInfo inside HistoInfoCommerces */}
          <CommerceProvider>
            {/* {console.log("HistoInfoCommerces")} */}
            <HistoInfoCommerces />
          </CommerceProvider>
        </div>
      </div>
    </div>
  );
}
