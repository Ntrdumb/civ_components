import { useState, useRef } from 'react';

export default function FileDialog({ labelSuffix = '', selectedFile, onFileSelect, onFileRemove }) {
  const fileInputRef = useRef(null);
  // const [selectedFile, setSelectedFile] = useState(null); // State for file selection
  const [isDragActive, setIsDragActive] = useState(false); // State for drag and drop

  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      // setSelectedFile(file); // Save the file in state
      onFileSelect(file); // Call the provided onFileSelect prop
      // console.log(file.name);
    }
  };
  
  // Handle file drop (drag and drop)
  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      // setSelectedFile(file); // Save the file in state
      onFileSelect(file); // Call the provided onFileSelect prop
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
    // setSelectedFile(null); // Remove the file from state
    onFileRemove();
  };

  // Abbreviate file name if it's too long
  const abbreviateFileName = (fileName) => {
    return fileName.length > 12 ? fileName.slice(0, 9) + '...' : fileName;
  };

  return (
    <div
      className={`flex-1 flex items-center justify-center p-4 ${
        isDragActive ? 'border-4 border-dotted border-indigo-500' : 'border border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleFileDrop}
    >
      <div className="flex flex-col items-center">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          id="fileInput"
          onChange={handleFileChange}
        />

        {/* File import button */}
        <button
          onClick={handleClick} // Trigger file input
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
  );
}
