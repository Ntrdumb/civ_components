import { useState, useRef } from 'react';
import TwoEntriesToggle from './TwoEntriesToggle';

export default function Projet() {
  const currencyOptions = ['$ CAD', '€ EUR'];
  const surfaceOptions = ['pi2', 'm2'];

  const [formData, setFormData] = useState({
    budget: '',
    surface: '',
    employees: '',
    salary: '',
    expenses: ''
  });

  const surfaceToggleRef = useRef();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function getEverything() {
    const selectedSurface = surfaceToggleRef.current.getSelectedOption();
    
    console.log(`Mon Projet: Budget - ${formData.budget}, Surface - ${formData.surface} ${selectedSurface}, Employees - ${formData.employees}, Salary - ${formData.salary}, Expenses - ${formData.expenses}`);
  }

  return (
    <div className="space-y-4">
      {/* <button
        className="bg-white p-1.5 rounded-md border border-gray-300 text-gray-500 hover:text-gray-700 fixed right-0"
        onClick={getEverything}
      >
        Get it
      </button> */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Le budget alloué au local commercial et/ou les coûts fournisseurs
        </label>
        <div className="flex">
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="flex-grow border border-gray-300 rounded p-2 text-sm placeholder:italic"
            placeholder="Écrivez le budget alloué"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          La surface du local commercial
        </label>
        <div className="flex">
          <input
            type="text"
            name="surface"
            value={formData.surface}
            onChange={handleInputChange}
            className="flex-grow border border-gray-300 rounded p-2 text-sm placeholder:italic"
            placeholder="Écrivez la surface"
          />

          <TwoEntriesToggle ref={surfaceToggleRef} options={surfaceOptions} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Le nombre de salariés à recruter
        </label>
        <input
          type="text"
          name="employees"
          value={formData.employees}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded p-2 text-sm placeholder:italic"
          placeholder="Écrivez le nombre de salariés futurs"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Le salaire annuel alloué aux salariés à recruter
        </label>
        <div className="flex">
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className="flex-grow border border-gray-300 rounded p-2 text-sm placeholder:italic"
            placeholder="Écrivez le montant du salaire"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Le total des dépenses estimées
        </label>
        <div className="flex">
          <input
            type="text"
            name="expenses"
            value={formData.expenses}
            onChange={handleInputChange}
            className="flex-grow border border-gray-300 rounded p-2 text-sm placeholder:italic"
            placeholder="Écrivez les dépenses estimées"
          />
        </div>
      </div>
    </div>
  );
}
