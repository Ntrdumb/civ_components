import { useState } from 'react';
import { ChevronRightIcon, Plus } from 'lucide-react';
import HistoInfo from './HistoInfo';
import RayonOption from './RayonOption';

export default function HistoInfoCommerces() {  
  // Save the list of commerces and their addresses
  const [commerces, setCommerces] = useState([{ num: 1, address: '', isAddressSet: false }]);
  const [radius, setRadius] = useState(''); // Handle radius globally if necessary

  // Handle radius change
  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius); // Update the global radius state
  };

  // Save address globally for access
  const handleSaveAddress = (index, address) => {
    const updatedCommerces = [...commerces];
    updatedCommerces[index].address = address;
    updatedCommerces[index].isAddressSet = true;
    setCommerces(updatedCommerces);
  };

  // Render a textbox to add a commerce. Num is the number of commerce added
  function Commerce({ num, index }) {
    const commerce = commerces[index];
    const [inputAddress, setInputAddress] = useState(commerce.address); // Keep the address visible in the input field

    // Handle button click to set the address
    const handleSetAddress = () => {
      if (inputAddress.trim()) {
        handleSaveAddress(index, inputAddress); // Save the address globally and mark it as set
      }
    };

    // Handle removing the address and unlocking the input/button
    const handleRemoveAddress = () => {
      if (commerces.length > 1) {
        // If there are more than one commerces, remove the selected commerce
        const updatedCommerces = commerces.filter((_, idx) => idx !== index);
        
        // Renumber remaining commerces
        const renumberedCommerces = updatedCommerces.map((commerce, idx) => ({
          ...commerce,
          num: idx + 1,
        }));
        
        setCommerces(renumberedCommerces);
      } else {
        // If there's only one commerce, clear the input and unlock the input/button
        setInputAddress(''); // Clear the local input value
        const updatedCommerces = [...commerces];
        updatedCommerces[index].address = '';
        updatedCommerces[index].isAddressSet = false;
        setCommerces(updatedCommerces); // Update the global state
      }
    };

    return (
      <div className="flex flex-col space-y-2 mt-2 border-t border-gray-500">
        <div className="flex items-center space-x-2 mt-2">
          <p className="text-sm font-bold text-gray-700 mb-1">Commerce {num}</p>
          <div className="flex items-center flex-grow space-x-2">
            <input 
              type="text"
              value={inputAddress} // Keep the address visible after setting
              onChange={(e) => setInputAddress(e.target.value)} // Update local state
              placeholder="Écrivez l'adresse postale"
              className="flex-grow border border-gray-300 rounded p-2 text-xs placeholder:italic"
              disabled={commerce.isAddressSet} // Disable the input when the address is set
            />
            <button 
              className="bg-white p-1.5 rounded-md border border-gray-300 text-gray-500 hover:text-gray-700"
              onClick={handleSetAddress} // Set the address when button is clicked
              disabled={commerce.isAddressSet} // Disable the button when the address is set
            >
              <ChevronRightIcon size={20} />
            </button>
          </div>
        </div>

        {/* Small red "Remove" button to clear the address or remove commerce */}
        <button 
          className="text-xs text-red-500"
          onClick={handleRemoveAddress} // Remove the commerce or clear the address when clicked
        >
          {commerces.length > 1 ? 'Remove Commerce' : 'Clear Address'}
        </button>

        {/* Conditionally render Historique du commerce based on whether address is set */}
        {commerce.isAddressSet && (
          <div>
            {/* Historique du commerce */}
            <HistoInfo labelSuffix={` du commerce ${num}`} />
            <RayonOption 
              radiusOptions={['1 km', '5 km', '10 km']} 
              onRadiusChange={handleRadiusChange} // Pass the handler to RayonOption
            />
          </div>
        )}
      </div>
    );
  }

  // Function to add a new commerce
  const handleAddCommerce = () => {
    setCommerces([...commerces, { num: commerces.length + 1, address: '', isAddressSet: false }]);
  };

  return (
    <div>
      {/* Render each commerce dynamically */}
      {commerces.map((commerce, index) => (
        <div key={index}>
          <Commerce num={commerce.num} index={index} />
        </div>
      ))}

      {/* Conditionally render "Add a commerce" button only when the latest address is set */}
      {commerces[commerces.length - 1].isAddressSet && (
        <div className="border-t p-1">
          <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800" onClick={handleAddCommerce}>
            <Plus size={20} />
            <span>Rajouter un autre commerce</span>
          </button>
        </div>
      )}
    </div>
  );
}
