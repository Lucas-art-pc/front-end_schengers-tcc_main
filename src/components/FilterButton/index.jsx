export const FilterButton = ({ label, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm ${
      selected === label
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-700"
    }`}
  >
    {label}
  </button>
);