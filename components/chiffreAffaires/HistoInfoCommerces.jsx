import { useState } from 'react';
import { ChevronRightIcon, Plus } from 'lucide-react';
import HistoInfo from './HistoInfo';
import RayonOption from './RayonOption';

export default function HistoInfoCommerces() {  
  const [address, setAddress] = useState('');    
  const [radius, setRadius] = useState('');
  const [commercesNum, setCommercesNum] = useState(1);
  const [isAddressSet, setIsAddressSet] = useState(false); // Track whether the address has been set

  // Handle radius change
  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius); // Update the global radius state
  };

  /* To render a textbox to add a commerce. Num is the number of commerce added */
  function Commerce(num) {
    const [inputAddress, setInputAddress] = useState(''); // Local state for the input value

    // Handle button click to set the address
    const handleSetAddress = () => {
      if (inputAddress.trim()) {
        setAddress(inputAddress); // Set the global address state if it's not empty
        setIsAddressSet(true); // Mark that the address is set
      }
    };

    // Handle removing the address and unlocking the input/button
    const handleRemoveAddress = () => {
      setInputAddress(''); // Clear local input value
      setAddress(''); // Clear global address
      setIsAddressSet(false); // Mark the address as unset
    };

    return (
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-700 mb-1">Commerce {num}</p>
          <div className="flex items-center flex-grow space-x-2">
            <input 
              type="text"
              value={inputAddress} // Use the local state for input value
              onChange={(e) => setInputAddress(e.target.value)} // Update local state
              placeholder="Écrivez l'adresse postale"
              className="flex-grow border border-gray-300 rounded p-2 text-xs placeholder:italic"
              disabled={isAddressSet} // Disable the input when the address is set
            />
            <button 
              className="bg-white p-1.5 rounded-md border border-gray-300 text-gray-500 hover:text-gray-700"
              onClick={handleSetAddress} // Set the address when button is clicked
              disabled={isAddressSet} // Disable the button when the address is set
            >
              <ChevronRightIcon size={20} />
            </button>
          </div>
        </div>

        {/* Small red "Remove" button to clear the address */}
        {isAddressSet && (
          <button 
            className="text-xs text-red-500"
            onClick={handleRemoveAddress} // Clear the address and unlock the input/button when clicked
          >
            Remove
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Info commerce associé */}
      <div>
        {/* Commerce # */}
        { Commerce(commercesNum) }

        {/* Conditionally render Historique du commerce based on whether address is set */}
        {isAddressSet && (
          <div>
            {/* Historique du commerce */}
            <HistoInfo labelSuffix={` du commerce ${commercesNum}`} />
            <RayonOption 
              radiusOptions={['1 km', '5 km', '10 km']} 
              onRadiusChange={handleRadiusChange} // Pass the handler to RayonOption
            />
          </div>
        )}
      </div>
        
      {isAddressSet && (
        // {/* Add a commerce */}
        <div className="border-t p-1">
          <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800">
            <Plus size={20} />
            <span>Rajouter un autre commerce</span>
          </button>
        </div>
      )}
    </div>
  );
}
