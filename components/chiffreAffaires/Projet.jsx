import { useState } from 'react';
import TwoEntriesToggle from './TwoEntriesToggle';

export default function Projet() {
  console.log("PRojet");
  const [formData, setFormData] = useState({
    budget: '',
    surface: '',
    employees: '',
    salary: '',
    expenses: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
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
            className="flex-grow border border-gray-300 rounded p-2 text-sm"
            placeholder="Écrivez le budget alloué"
          />
          
          <TwoEntriesToggle />
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
            className="flex-grow border border-gray-300 rounded p-2 text-sm"
            placeholder="Écrivez la surface"
          />

          <TwoEntriesToggle />
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
          className="w-full border border-gray-300 rounded p-2 text-sm"
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
            className="flex-grow border border-gray-300 rounded p-2 text-sm"
            placeholder="Écrivez le montant du salaire"
          />
          <TwoEntriesToggle />
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
            className="flex-grow border border-gray-300 rounded p-2 text-sm"
            placeholder="Écrivez les dépenses estimées"
          />
          <TwoEntriesToggle />
        </div>
      </div>
    </div>
  )
}
