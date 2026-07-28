import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const PasswordInput = ({
  name,
  value,
  onChange,
  placeholder = "Digite sua senha",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full border border-gray-500 rounded-lg px-4 py-3 pr-12
          focus:outline-none focus:ring-2 focus:ring-blue-primary
          focus:border-blue-secondary transition
        "
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};