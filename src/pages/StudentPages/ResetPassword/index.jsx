import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Input } from "../../../components/Input";
import { Label } from "../../../components/Label";
import { FormLayout } from "../../../layouts/FormLayout";
import { resetPassword } from "../../../api/services/auth/studentAuthService";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState(null);
  const [countdown, setCountdown] = useState(7);
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const password = e.target.password.value;
    const passwordConfirmation = e.target.password_confirmation.value;

    if (password !== passwordConfirmation) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({ token, email, password, password_confirmation: passwordConfirmation });

      setMessage("Senha alterada com sucesso!");
      setCountdown(7);

      let seconds = 7;
      const interval = setInterval(() => {
        seconds -= 1;
        setCountdown(seconds);
        if (seconds <= 0) {
          clearInterval(interval);
          navigate("/auth/login-student", { state: { message: "Senha alterada com sucesso!" } });
        }
      }, 1000);

    } catch (err) {
      setError(err.message || "Erro ao redefinir a senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <p className="text-red-600 text-center mt-10">
        Link inválido ou expirado.
      </p>
    );
  }

  if (message) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center px-6 py-10">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Senha alterada com sucesso!</h2>
        <p className="text-sm text-gray-500">
          Você será redirecionado para o login em{" "}
          <span className="font-semibold text-gray-700">{countdown}</span>{" "}
          {countdown === 1 ? "segundo" : "segundos"}.
        </p>
        <button
          onClick={() => navigate("/auth/login-student", { state: { message: "Senha alterada com sucesso!" } })}
          className="mt-2 text-sm text-yellow-600 hover:underline"
        >
          Ir agora
        </button>
      </div>
    );
  }

  return (
    <FormLayout
      title="Redefinir senha"
      description="Digite sua nova senha"
      onSubmit={handleSubmit}
    >
      <Label htmlFor="password">Nova senha:</Label>
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Digite sua nova senha..."
        disabled={loading}
      />

      <Label htmlFor="password_confirmation">Confirmar senha:</Label>
      <Input
        type="password"
        name="password_confirmation"
        id="password_confirmation"
        placeholder="Confirme sua nova senha..."
        disabled={loading}
      />

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
            Salvando...
          </>
        ) : (
          "Salvar nova senha"
        )}
      </button>
    </FormLayout>
  );
};