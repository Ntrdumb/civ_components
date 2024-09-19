import { useState } from 'react';
import FileDialog from './FileDialog';
import TwoEntriesToggle from './TwoEntriesToggle';

export default function HistoInfo({ labelSuffix = '' }) {
  const [averageBasket, setAverageBasket] = useState('');
  const [totalExpenses, setTotalExpenses] = useState('');
  const [globalTurnover, setGlobalTurnover] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const currencyOptions = ['$ CAD', '€ EUR'];

  function getEverything() {
    // const fileInfo = `File: ${selectedFile.name}, Size: ${selectedFile.size} bytes, Type: ${selectedFile.type}`;
    console.log("Mon Historique: " + averageBasket + ", " + totalExpenses + ", " + globalTurnover + ", ");
    if (selectedFile) {
      console.log(selectedFile.name);
    }
  }
  
  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  }

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
                value={averageBasket}
                onChange={(e) => setAverageBasket(e.target.value)}
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
                value={totalExpenses}
                onChange={(e) => setTotalExpenses(e.target.value)}
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
        <FileDialog labelSuffix={labelSuffix} onFileSelect={handleFileSelect} onFileRemove={handleFileRemove}/> 
      </div>

      {/* Chiffre d'affaires global existants */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Le chiffre d'affaires global des commerces existants {labelSuffix}
        </label>
        <div className="flex items-center">
          <input
            type="text"
            value={globalTurnover}
            onChange={(e) => setGlobalTurnover(e.target.value)}
            placeholder="Écrivez le budget alloué"
            className="flex-grow border border-gray-300 text-gray-700 rounded p-2 text-xs placeholder:italic"
          />
          {/* <TwoEntriesToggle options={currencyOptions} /> */}
        </div>
      </div>
    </div>
  );
}
