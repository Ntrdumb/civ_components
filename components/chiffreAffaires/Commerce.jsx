import { ChevronRightIcon } from 'lucide-react';
import HistoInfo from './HistoInfo';
import RayonOption from './RayonOption';

export default function Commerce({ commerces, addresses, setAddresses, handleSaveAddress, handleRemoveAddress, handleRadiusChange }) {
  return (
    <div>
      {commerces.map((commerce, index) => {
        // Handle input change locally by updating the external state
        const handleInputChange = (e) => {
          const updatedAddresses = [...addresses];
          updatedAddresses[index] = e.target.value;
          setAddresses(updatedAddresses);
        };

        const handleSetAddress = () => {
          if (addresses[index].trim()) {
            handleSaveAddress(index, addresses[index]); // Save the address globally and mark it as set
          }
        };

        const handleRemoveAddressCommerce = () => {
          handleRemoveAddress(index);
        };

        return (
          <div key={index} className="flex flex-col space-y-2 mt-2 border-t border-gray-500">
            <div className="flex items-center space-x-2 mt-2">
              <p className="text-sm font-bold text-gray-700 mb-1">Commerce {commerce.num}</p>
              <div className="flex items-center flex-grow space-x-2">
                <input
                  type="text"
                  value={addresses[index]} // Use the external addresses state
                  onChange={handleInputChange} // Update the address in the external state
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
              onClick={handleRemoveAddressCommerce} // Remove the commerce or clear the address when clicked
            >
              {commerces.length > 1 ? 'Remove Commerce' : 'Clear Address'}
            </button>

            {/* Conditionally render Historique du commerce based on whether address is set */}
            {commerce.isAddressSet && (
              <div>
                <HistoInfo labelSuffix={` du commerce ${commerce.num}`} />
                <RayonOption
                  radiusOptions={['1 km', '5 km', '10 km']}
                  onRadiusChange={handleRadiusChange} // Pass the handler to RayonOption
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
