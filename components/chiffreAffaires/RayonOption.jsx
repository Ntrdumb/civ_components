import { ChevronDownIcon } from 'lucide-react';

function RayonOption({ radiusOptions = [], onRadiusChange, selectedRadius }) { 
  
  // Handles le changement quand tu select
  const handleRadiusChange = (e) => {
    const selectedRadius = e.target.value;
    onRadiusChange(selectedRadius); // From the parent handler to update the radius in context
  };

  return (
    <div className='flex items-center space-x-2 my-2'>
      <h3 className="text-xs font-medium text-gray-700 mb-1">Le rayon de chalandise du commerce</h3>
      <div className="relative">
        <select
          value={selectedRadius || 'Rayon autour de l\'adresse'}
          onChange={handleRadiusChange}
          className="block appearance-none w-full text-xs italic bg-white border border-gray-300 text-gray-500 py-0.5 px-2 pr-8 rounded leading-tight focus:outline-none focus:ring focus:border-blue-300"
        >
          <option disabled>Rayon autour de l'adresse</option>
          {radiusOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDownIcon size={20} />
        </div>
      </div>
    </div>
  );
}

export default RayonOption;
