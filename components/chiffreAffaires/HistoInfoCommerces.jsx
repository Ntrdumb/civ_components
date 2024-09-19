import { Plus } from 'lucide-react';
import { useCommerceContext } from './CommerceContext';
import Commerce from './Commerce';

export default function HistoInfoCommerces() {
  const { commerces, setCommerces } = useCommerceContext();

  const handleRemoveCommerce = (index) => {
    if (commerces.length > 1) {
      let updatedCommerces = commerces.filter((_, idx) => idx !== index);

      // Renumber the remaining commerces
      updatedCommerces = updatedCommerces.map((commerce, idx) => ({
        ...commerce,
        num: idx + 1, // Renumber the remaining commerces
      }));

      setCommerces(updatedCommerces);
    } else {
      // Reset the only remaining commerce
      const updatedCommerces = [...commerces];
      updatedCommerces[0] = {
        num: 1,
        address: '',
        isAddressSet: false,
        averageBasket: '',
        totalExpenses: '',
        globalTurnover: '',
        selectedFile: null,
        radius: '',
      };
      setCommerces(updatedCommerces);
    }
  };

  // Function to add a new commerce
  const handleAddCommerce = () => {
    setCommerces([...commerces, { num: commerces.length + 1, address: '', isAddressSet: false, averageBasket: '', totalExpenses: '', globalTurnover: '', selectedFile: null }]);
  };

  return (
    <div>
      {/* Pass all commerces to the Commerce component */}
      {commerces.map((commerce, index) => (
        <Commerce key={index} index={index} commerce={commerce} handleRemoveCommerce={handleRemoveCommerce} commercesLength={commerces.length} />
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
