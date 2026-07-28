export const Textarea = ({
  name,
  value,
  onChange,
  rows = 3,
  placeholder,
  className = "",
  ...props
}) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className={`
        w-full border border-gray-500 rounded-lg px-4 py-3
        focus:outline-none focus:ring-2 focus:ring-blue-primary
        focus:border-blue-secondary transition
        ${className}
      `}
      {...props}
    />
  );
};