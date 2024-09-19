import { useState } from 'react';
import { useCommerceContext } from './CommerceContext';
import FileDialog from './FileDialog';
import TwoEntriesToggle from './TwoEntriesToggle';

export default function HistoInfo({ labelSuffix = '', index }) {
  let commerce, handleSaveCommerce;

  // Check if the context is available
  try {
    const context = useCommerceContext();
    commerce = context.commerces ? context.commerces[index] : undefined;
    handleSaveCommerce = context.handleSaveCommerce;
  } catch (error) {
    // Context is not available, so fallback to local state
    commerce = undefined;
  }

  // Fallback to local state when context is not available (i.e., when used outside CommerceContext)
  const [averageBasket, setAverageBasket] = useState(commerce?.averageBasket || '');
  const [totalExpenses, setTotalExpenses] = useState(commerce?.totalExpenses || '');
  const [globalTurnover, setGlobalTurnover] = useState(commerce?.globalTurnover || '');
  const [selectedFile, setSelectedFile] = useState(commerce?.selectedFile || null);

  // Add a guard to prevent accessing properties of undefined
  // if (!commerce) {
  //   return <div>Loading...</div>;  // Or handle the case where commerce is undefined
  // }

  const currencyOptions = ['$ CAD', '€ EUR'];

  function getEverything() {
    // const fileInfo = `File: ${selectedFile.name}, Size: ${selectedFile.size} bytes, Type: ${selectedFile.type}`;
    console.log("Mon Historique: " + averageBasket + ", " + totalExpenses + ", " + globalTurnover + ", ");
    if (selectedFile) {
      console.log(selectedFile.name);
    }
  }
  
  const handleFileSelect = (file) => {
    if (handleSaveCommerce) {
      handleSaveCommerce(index, 'selectedFile', file);
    } else {
      setSelectedFile(file);
    }
  };

  const handleFileRemove = () => {
    if (handleSaveCommerce) {
      handleSaveCommerce(index, 'selectedFile', null);
    } else {
      setSelectedFile(null);
    }
  }

  const handleSaveField = (field, value) => {
    if (handleSaveCommerce) {
      console.log("THERES A COMMERCE!");
      handleSaveCommerce(index, field, value);
    } else {
      // Update local state when not connected to context
      switch (field) {
        case 'averageBasket':
          setAverageBasket(value);
          break;
        case 'totalExpenses':
          setTotalExpenses(value);
          break;
        case 'globalTurnover':
          setGlobalTurnover(value);
          break;
        default:
          break;
      }
    }
  };
  
  return (
    <div className="space-y-4 mt-2">
      <button className="bg-white p-1.5 rounded-md border border-gray-300 text-gray-500 hover:text-gray-700 fixed right-0"
          onClick={getEverything}>
          Get it Histo
      </button>
      {/* Panier moyen et total des dépenses */}
      <div className="flex space-x-4 text-gray-700">
        {/* Textbox div */}
        <div className="flex-1">
          {/* Panier moyen */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Le panier moyen par commandes {labelSuffix}
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={commerce ? commerce.averageBasket : averageBasket}
                onChange={(e) => handleSaveField('averageBasket', e.target.value)}
                placeholder="Écrivez le panier moyen"
                className="flex-grow border border-gray-300 rounded p-2 text-xs placeholder:italic"
              />
              {/* <TwoEntriesToggle options={currencyOptions} /> */}
            </div>
          </div>

          {/* Total des dépenses */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Le total des dépenses existantes {labelSuffix}
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={commerce ? commerce.totalExpenses : totalExpenses}
                onChange={(e) => handleSaveField('totalExpenses', e.target.value)}
                placeholder="Écrivez le budget existantes"
                className="flex-grow border border-gray-300 rounded p-2 text-xs placeholder:italic"
              />
              {/* <TwoEntriesToggle options={currencyOptions} /> */}
            </div>
          </div>
        </div>

        {/* Separator line */}
        <div className="border-l border-gray-300"></div>
        
        {/* Import div */}
        <FileDialog labelSuffix={labelSuffix} selectedFile={commerce ? commerce.selectedFile : selectedFile} onFileSelect={handleFileSelect} onFileRemove={handleFileRemove}/> 
      </div>

      {/* Chiffre d'affaires global existants */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Le chiffre d'affaires global des commerces existants {labelSuffix}
        </label>
        <div className="flex items-center">
          <input
            type="text"
            value={commerce ? commerce.globalTurnover : globalTurnover}
            onChange={(e) => handleSaveField('globalTurnover', e.target.value)}
            placeholder="Écrivez le budget alloué"
            className="flex-grow border border-gray-300 text-gray-700 rounded p-2 text-xs placeholder:italic"
          />
          {/* <TwoEntriesToggle options={currencyOptions} /> */}
        </div>
      </div>
    </div>
  );
}
