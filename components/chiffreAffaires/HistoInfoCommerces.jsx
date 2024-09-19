import { useState } from 'react';
import { Plus } from 'lucide-react';
import Commerce from './Commerce';

export default function HistoInfoCommerces(onContentChange) {
  const [commerces, setCommerces] = useState([{ num: 1, address: '', isAddressSet: false }]);
  const [addresses, setAddresses] = useState(['']); // State to track addresses for all commerces
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

    const updatedAddresses = [...addresses];
    updatedAddresses[index] = address;
    setAddresses(updatedAddresses);
  };

  // Handle removing the address and unlocking the input/button
  const handleRemoveAddress = (index) => {
    if (commerces.length > 1) {
      const updatedCommerces = commerces.filter((_, idx) => idx !== index);
      const updatedAddresses = addresses.filter((_, idx) => idx !== index);

      const renumberedCommerces = updatedCommerces.map((commerce, idx) => ({
        ...commerce,
        num: idx + 1,
      }));
      
      setCommerces(renumberedCommerces);
      setAddresses(updatedAddresses);
    } else {
      const updatedCommerces = [...commerces];
      updatedCommerces[index].address = '';
      updatedCommerces[index].isAddressSet = false;
      setCommerces(updatedCommerces);

      const updatedAddresses = [...addresses];
      updatedAddresses[index] = '';
      setAddresses(updatedAddresses);
    }
  };

  // Function to add a new commerce
  const handleAddCommerce = () => {
    setCommerces([...commerces, { num: commerces.length + 1, address: '', isAddressSet: false }]);
    setAddresses([...addresses, '']);
  };

  return (
    <div>
      {/* Pass all commerces to the Commerce component */}
      <Commerce
        commerces={commerces}
        addresses={addresses}
        setAddresses={setAddresses}
        handleSaveAddress={handleSaveAddress}
        handleRemoveAddress={handleRemoveAddress}
        handleRadiusChange={handleRadiusChange}
        
      />

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
