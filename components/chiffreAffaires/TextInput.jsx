// Self-explanatory
export default function TextInput({ label, value, onChange, placeholder }) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="flex items-center">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="flex-grow border border-gray-300 rounded p-2 text-xs placeholder:italic"
          />
        </div>
      </div>
    );
}
  