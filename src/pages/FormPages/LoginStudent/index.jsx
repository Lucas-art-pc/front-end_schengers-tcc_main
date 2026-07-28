import { Input } from "../../../components/Input";
import { Label } from "../../../components/Label";
import { LinkVariable } from "../../../components/Link";
import { FormLayout } from "../../../layouts/FormLayout";
import { loginStudent } from "../../../api/services/auth/studentAuthService";
import { PasswordInput } from "../../../components/PassworInput";
import { useLogin } from "../../../hooks/useLogin";

export const LoginStudent = () => {
  const {
    form, error, loading, isBlocked, remainingFormatted,
    handleChange, onSubmit,
  } = useLogin({
    loginFn: loginStudent,
    tokenKey: "auth_token_user",
    redirectTo: "/student/dashboard",
    userType: "student",
  })

  console.log(isBlocked)

  return (
    <FormLayout
      title="Login de Aluno"
      description="Preencha os dados para criar sua conta"
      onSubmit={onSubmit}
    >
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-600 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}
      <div className="space-y-5">
        <div>
          <Label>Email</Label>
          <Input
            type={"text"}
            name={"email"}
            placeholder={"Digite seu email..."}
            value={form.email}
            onChange={handleChange}
            disabled={isBlocked}
          />
        </div>

        <div>
          <Label>Senha</Label>
          <PasswordInput
            type={"password"}
            name={"password"}
            placeholder={"Digite sua senha..."}
            value={form.password}
            onChange={handleChange}
            disabled={isBlocked}
          />
        </div>

        <button
          type="submit"
          disabled={loading || isBlocked}
          className="w-full bg-yellow-500 hover:bg-yellow-600
            text-white font-semibold py-3 rounded-lg
            transition duration-200 shadow-sm hover:shadow-md
            disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isBlocked
            ? `Bloqueado (${remainingFormatted})`
            : loading
            ? "Entrando..."
            : "Login"}
        </button>
      </div>
      <div className="flex justify-center items-center">
        <LinkVariable type={"subtle"} href="/auth/register-student">
          Fazer cadastro de aluno!
        </LinkVariable>
      </div>
      <div className="flex justify-center items-center">
        <LinkVariable type={"subtle"} href="/auth/forgot-password">
          Esqueci a senha!
        </LinkVariable>
      </div>
    </FormLayout>
  );
};
