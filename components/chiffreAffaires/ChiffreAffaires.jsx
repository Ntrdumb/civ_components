"use client";
import { useState } from 'react';
import { XIcon, InfoIcon, ChevronUpIcon, ChevronDownIcon } from 'lucide-react';
import { Collapse } from 'react-collapse';
import Persona from './Persona';
import Projet from './projet'; 
import Historique from './Historique';

// Helper function to compute a smooth gradient between red and teal based on precision level
function getPrecisionColor(precisionLevel) {
  const r = Math.min(255, 255 - (precisionLevel * 2.55)); // Red decreases as precision increases
  const g = Math.max(128, (precisionLevel * 1.27));       // Green increases as precision increases
  const b = 128;                                          // Blue stays constant to achieve teal
  return `rgb(${r}, ${g}, ${b})`;
}

export default function ChiffreAffaires({ precisionLevel = 50 }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('persona');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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
      <div className="flex flex-col items-center">
        {/* Top part */}
        <div className="w-5/6 items-center">
          {/* Revenue info section */}
          <div className="bg-teal-500 rounded-lg p-4 mb-4">
            <p className="text-sm mb-1">Chiffre d'affaires potentiel sommaire</p>
            <p className="text-4xl font-bold">500 000 $cad</p>
            <p className="text-xs">selon nos calculs</p>
          </div>

          {/* Precision */}
          <div className="mb-4">
            <p className="text-sm mb-2">Niveau de précision</p>
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

          {/* Bottom part content with react-collapse */}
          <Collapse isOpened={isExpanded}>
            <div>
              {/* Buttons for persona, project, history */}
              <div className="flex space-x-2 mb-4 justify-center">
                <button
                  className={`px-3 py-3 rounded-xl text-sm ${activeTab === 'persona' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setActiveTab('persona')}
                >
                  Mon persona ciblé
                </button>
                <button
                  className={`px-3 py-3 rounded-xl text-sm ${activeTab === 'projet' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setActiveTab('projet')}
                >
                  Mon projet
                </button>
                <button
                  className={`px-3 py-3 rounded-xl text-sm ${activeTab === 'historique' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setActiveTab('historique')}
                >
                  Mon historique
                </button>
              </div>

              {/* Always render the content of each tab, but hide the inactive tabs */}
              <div>
                <div style={{ display: activeTab === 'persona' ? 'block' : 'none' }}>
                  <Persona />
                </div>
                <div style={{ display: activeTab === 'projet' ? 'block' : 'none' }}>
                  <Projet />
                </div>
                <div style={{ display: activeTab === 'historique' ? 'block' : 'none' }}>
                  <Historique />
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
}
