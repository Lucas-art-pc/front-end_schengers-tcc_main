export const Input = ({ onChange, ...props }) => {
  return (
    <input
      {...props}
      onChange={onChange}
      className="w-full border border-gray-500 rounded-lg px-4 py-3 
        focus:outline-none focus:ring-2 focus:ring-blue-primary
        focus:border-blue-secondary transition"
    />
  );
};
