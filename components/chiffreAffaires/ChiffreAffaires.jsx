"use client";
import { useState, useRef, useEffect } from 'react';
import { XIcon, InfoIcon, ChevronUpIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import Persona from './Persona';
import Projet from './projet'; 
import Historique from './Historique'; 

// Helper function to compute a smooth gradient between red and teal based on precision level
function getPrecisionColor(precisionLevel) {
  // Red to teal gradient transition based on the precision level (1-100)
  const r = Math.min(255, 255 - (precisionLevel * 2.55));  // Red starts high, decreases as precision increases
  const g = Math.max(128, (precisionLevel * 1.27));        // Green starts low, increases as precision increases
  const b = 128;                                           // Blue stays constant to achieve teal
  return `rgb(${r}, ${g}, ${b})`;
}

// Define the ChiffreAffaires component
export default function ChiffreAffaires({ precisionLevel = 90 }) { // precisionLevel ranges from 1 to 100
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('persona');
  const [contentHeight, setContentHeight] = useState('auto');
  const contentRef = useRef(null);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to update content height based on active tab
  const updateContentHeight = () => {
    if (contentRef.current) {
      // First set height to auto to allow content to fully render
      setContentHeight('auto');
      
      // Use a timeout to wait for the DOM to finish rendering the new content
      setTimeout(() => {
        if (contentRef.current) {
          setContentHeight(`${contentRef.current.scrollHeight}px`);
        }
      }, 50); // A small delay (50ms) to allow rendering to complete
    }
  };

  // Calculate the height of the content when expanded
  useEffect(() => {
    updateContentHeight();
    // console.log("Active tab : " + activeTab)
  }, [isExpanded, activeTab]); // Recalculate height on tab change or expand state change

  // Recalculate height when any re-render inside child components occurs
  useEffect(() => {
    const observer = new MutationObserver(updateContentHeight);
    if (contentRef.current) {
      observer.observe(contentRef.current, { childList: true, subtree: true });
    }
    return () => {
      if (contentRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[700px] max-w-lg">
      {/* Header with title and icons */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">CHIFFRE D'AFFAIRES POTENTIEL</h2>
        <div className="flex space-x-2">
          <button className="text-gray-500 hover:text-gray-700">
            <XIcon size={20} />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <InfoIcon size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-col items-center'>
        {/* Top part */}
        <div className='w-5/6 items-center'>

          {/* Revenue info section */}
          <div className="bg-teal-500 rounded-lg p-4 mb-4">
            <p className="text-sm mb-1">Chiffre d'affaires potentiel sommaire</p>
            <p className="text-4xl font-bold">500 000 $cad</p>
            <p className="text-xs">selon nos calculs</p>
          </div>

          {/* Precision */}
          <div className="mb-4">
            <p className="text-sm mb-2">Niveau de précision</p>
            {/* Thickness */}
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${precisionLevel}%`, 
                  backgroundColor: getPrecisionColor(precisionLevel), 
                  transition: 'width 0.3s ease, background-color 0.3s ease'
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>Faible</span>
              <span>Moyen</span>
              <span>Fort</span>
            </div>
          </div>
        </div>

        {/* Bottom part (Additional information) */}
        <div className="border-t pt-4 w-full max-w-lg">

          {/* Bottom title */}
          <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={toggleExpand}>
            <h3 className="font-semibold italic">Informations supplémentaires</h3>
            {isExpanded ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
          </div>

          {/* Bottom part content */}
          <div 
            ref={contentRef}
            style={{ height: isExpanded ? contentHeight : '0px', transition: 'height 0.3s ease' }} 
            className={`overflow-hidden transition-all duration-300 ease-in-out`}
          >

            {/* Buttons for persona, project, history */}
            <div className="flex space-x-2 mb-4 justify-center">
              <button className={`px-3 py-3 rounded-xl text-sm ${activeTab === 'persona' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setActiveTab('persona')}
              >
                Mon persona ciblé
              </button>
              <button className={`px-3 py-3 rounded-xl text-sm ${activeTab === 'projet' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setActiveTab('projet')}
              >
                Mon projet
              </button>
              <button className={`px-3 py-3 rounded-xl text-sm ${activeTab === 'historique' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setActiveTab('historique')}
              >
                Mon historique
              </button>
            </div>

            {/*  Mon persona ciblé Button contents */}
            {activeTab === 'persona' && (
              <Persona />
            )} {/* Mon persona ciblé Button contents end */}

            {/* Mon projet Button contents */}
            {activeTab === 'projet' && (
                <Projet />
            )} {/* Mon projet Button contents end */}

            {/* Mon historique Button contents */}
            {activeTab === 'historique' && (
              <div>
                <Historique />
              </div>
            )} {/* Mon historique Button contents end */}

          </div> { /* Additional information end */}   
      
        </div> {/* Common header end */}
      </div>
    </div>
  );
}
