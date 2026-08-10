import { Input } from "../../../components/Input";
import { Label } from "../../../components/Label";
import { LinkVariable } from "../../../components/Link";
import { PasswordInput } from "../../../components/PassworInput";
import { FormLayout } from "../../../layouts/FormLayout";
import { loginTeacherUser } from "../../../api/services/auth/teacherAuthService";
import { useLogin } from "../../../hooks/useLogin";

export const LoginTeacher = () => {
  // LoginTeacher.jsx
const { form, error, loading, handleChange, onSubmit } = useLogin({
  loginFn: loginTeacherUser,
  tokenKey: "auth_token_teacher",
  redirectTo: "/teacherAuth/dashboard",
  userType: "teacher",     // <- novo parâmetro
})
  return (
    <FormLayout
      title="Login de Professor"
      description="Preencha os dados para entrar"
      onSubmit={onSubmit}
    >

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-600 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}
      <div className="space-y-5">
        <div>
          <Label>E-mail</Label>
          <Input
            type={"text"}
            name={"email"}
            value={form.email}
            placeholder={"Digite seu email..."}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Senha</Label>
          <PasswordInput
            type={"text"}
            name={"password"}
            value={form.password}
            placeholder={"Digite sua senha..."}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600
            text-white font-semibold py-3 rounded-lg
            transition duration-200 shadow-sm hover:shadow-md
            disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Entrando..." : "Login"}
        </button>
      </div>
      <div className="flex justify-center items-center">
        <LinkVariable type={"subtle"} href="/auth/register-teacherUser">
          Ainda não tenho conta!
        </LinkVariable>
      </div>
    </FormLayout>
  );
};
