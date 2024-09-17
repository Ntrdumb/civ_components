import { useState } from 'react';
import TwoEntriesToggle from './TwoEntriesToggle';

export default function HistoInfo({ labelSuffix = '' }) { // Pass labelSuffix as a prop with a default value
  const [averageBasket, setAverageBasket] = useState('');
  const [totalExpenses, setTotalExpenses] = useState('');
  const [globalTurnover, setGlobalTurnover] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // State for file selection
  const [isDragActive, setIsDragActive] = useState(false); // State for drag and drop

  const currencyOptions = ['$ CAD', '€ EUR'];

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setSelectedFile(file); // Save the file in state
    }
  };

  // Handle file drop (drag and drop)
  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file); // Save the file in state
    }
    setIsDragActive(false); // Remove drag active state
  };

  // Handle drag over (to allow dropping)
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true); // Set drag active state
  };

  // Handle drag leave (when dragging leaves the div)
  const handleDragLeave = () => {
    setIsDragActive(false); // Remove drag active state
  };

  // Handle file removal
  const handleFileRemove = () => {
    setSelectedFile(null); // Remove the file from state
  };

  // Abbreviate file name if it's too long
  const abbreviateFileName = (fileName) => {
    return fileName.length > 12 ? fileName.slice(0, 9) + '...' : fileName;
  };

  return (
    <div className="space-y-4 mt-2">
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
              <TwoEntriesToggle options={currencyOptions} />
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
              <TwoEntriesToggle options={currencyOptions} />
            </div>
          </div>
        </div>

        {/* Separator line */}
        <div className="border-l border-gray-300"></div>

        {/* Import div */}
        <div
          className={`flex-1 flex items-center justify-center p-4 ${isDragActive ? 'border-4 border-dotted border-indigo-500' : 'border border-gray-300'}`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleFileDrop}
        >
          <div className="flex flex-col items-center">
            {/* Hidden file input */}
            <input
              type="file"
              className="hidden"
              id="fileInput"
              onChange={handleFileChange}
            />

            {/* File import button */}
            <button
              onClick={() => document.getElementById('fileInput').click()} // Trigger file input
              className="w-16 h-16 bg-white border border-gray-300 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-50"
            >
              {selectedFile ? (
                <p className="text-xs text-gray-700 text-center truncate w-full px-1">
                  {abbreviateFileName(selectedFile.name)} {/* Show abbreviated file name */}
                </p>
              ) : (
                <p className="text-4xl mb-2">+</p> // Show plus sign if no file selected
              )}
            </button>

            {/* Annuler */}
            {selectedFile && (
              <button
                onClick={handleFileRemove} // Remove the file
                className="text-xs text-red-500 mt-1"
              >
                Annuler
              </button>
            )}

            <span className="text-xs text-gray-500 mt-1 text-center">
              Importer l'état des résultats {labelSuffix}
            </span>
          </div>
        </div>
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
          <TwoEntriesToggle options={currencyOptions} />
        </div>
      </div>
    </div>
  );
}
