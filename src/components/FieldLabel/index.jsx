export const FieldLabel = ({ htmlFor, required, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5"
    >
      {children}
      {required && (
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
      )}
    </label>
  );
}