import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
import HistoInfo from './HistoInfo';
import RayonOption from './RayonOption';
import { useCommerceContext } from './CommerceContext';

export default function Commerce({ index, commerce, handleRemoveCommerce, commercesLength }) {
  const { handleSaveCommerce } = useCommerceContext();

  const handleSetAddress = () => {
    if (commerce.address.trim()) {
      handleSaveCommerce(index, 'isAddressSet', true);
    }
  };

  const handleRadiusChange = (selectedRadius) => {
    // Save the selected radius to the commerce object in context
    handleSaveCommerce(index, 'radius', selectedRadius);
  };

  return (
    <div key={index} className="flex flex-col space-y-2 mt-2 border-t border-gray-500">
      <div className="flex items-center space-x-2 mt-2">
        <p className="text-sm font-bold text-gray-700 mb-1">Commerce {commerce.num}</p>
        <div className="flex items-center flex-grow space-x-2">
          <input
            type="text"
            value={commerce.address}
            onChange={(e) => handleSaveCommerce(index, 'address', e.target.value)}
            placeholder="Écrivez l'adresse postale"
            className="flex-grow border border-gray-300 rounded p-2 text-xs placeholder:italic"
            disabled={commerce.isAddressSet}
          />
          <button
            className="bg-white p-1.5 rounded-md border border-gray-300 text-gray-500 hover:text-gray-700"
            onClick={handleSetAddress}
            disabled={commerce.isAddressSet}
          >
            <ChevronRightIcon size={20} />
          </button>
        </div>
      </div>

      {/* Small red "Remove" button to clear the address or remove commerce */}
      <button
        className="text-xs text-red-500"
        onClick={() => handleRemoveCommerce(index)}
      >
        {commercesLength > 1 ? 'Remove Commerce' : 'Clear Address'}
      </button>

      {/* Conditionally render Historique du commerce based on whether address is set */}
      {commerce.isAddressSet && (
        <div>
          <HistoInfo index={index} labelSuffix={` du commerce ${commerce.num}`} />
          <RayonOption
            radiusOptions={['1 km', '5 km', '10 km']}
            onRadiusChange={handleRadiusChange}
            selectedRadius={commerce.radius}
          />
        </div>
      )}
    </div>
  );
}
