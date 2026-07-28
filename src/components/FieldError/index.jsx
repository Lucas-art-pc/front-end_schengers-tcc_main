export const FieldError = ({ message }) => {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
      <span>⚠</span> {message}
    </p>
  );
}
