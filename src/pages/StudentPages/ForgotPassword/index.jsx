import { useState } from "react";
import { Input } from "../../../components/Input";
import { Label } from "../../../components/Label";
import { FormLayout } from "../../../layouts/FormLayout";
import { forgotPassword } from "../../../api/services/auth/studentAuthService";
import { useNavigate } from "react-router-dom";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const email = e.target.email.value.trim();

    if (!email || !EMAIL_REGEX.test(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    setLoading(true);

    try {
      const data = await forgotPassword(email);
      setMessage(data.message);
      e.target.reset();
      navigate("/auth/login-student")
    } catch (err) {
      setError(err.message || "Erro ao conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="Resgatar sua senha"
      description="Coloque o email para alterar a senha"
      onSubmit={handleSubmit}
    >
      <Label htmlFor="email">Email:</Label>
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Digite seu email..."
        disabled={loading}
      />

      {message && (
        <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          {message}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-500 hover:bg-yellow-600
          text-white font-semibold py-3 rounded-lg
          transition duration-200 shadow-sm hover:shadow-md
          disabled:opacity-60 disabled:cursor-not-allowed
          flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            Enviando...
          </>
        ) : (
          "Enviar"
        )}
      </button>
    </FormLayout>
  );
};