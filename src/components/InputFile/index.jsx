export const InputFile = ({ label, name, error, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="file"
        name={name}
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={onChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}