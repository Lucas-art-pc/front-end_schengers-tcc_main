import { useState } from "react";
import { Input } from "../../../components/Input";
import { Label } from "../../../components/Label";
import { FormLayout } from "../../../layouts/FormLayout";
import { LinkVariable } from "../../../components/Link";
import { Textarea } from "../../../components/Textarea";
import { PasswordInput } from "../../../components/PassworInput";
import { useNavigate } from "react-router-dom";
import { registerTeacherUser } from "../../../api/services/auth/teacherAuthService";
import { ModalTerms } from "../../../components/ModalTerms";
import { PrivacyPolicy } from "../../../components/PrivacyPolicy";
import { TermsResponsibility } from "../../../components/TermsResponsability";
import { nameFormat } from "../../../validators/studentFormValidator";

export const FormTeacherUser = () => {
  const navigate = useNavigate();
  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    apresentation: "",
    term_privacy: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNameBlur = () => {
    setForm((prev) => ({ ...prev, name: nameFormat(prev.name) }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerTeacherUser(form);

      setForm({
        name: "",
        email: "",
        apresentation: "",
        term_privacy: "",
        password: "",
        password_confirmation: "",
      });

      navigate("/auth/login-teacherUser");
    } catch (err) {

      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const firstError = Object.values(errors).flat()[0];
        setError(firstError);
      } else {
        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Erro ao criar conta. Tente novamente.";
        setError(message);
      }
    }
  };

  return (
    <FormLayout
      title={"Faça um usuário de professor"}
      description={"Para ter acesso a nossas vagas"}
      onSubmit={handleSubmit}
    >
      <ModalTerms openModal={openPrivacy} onClose={setOpenPrivacy} title={"Política de Privacidade"}>
        <PrivacyPolicy/>
      </ModalTerms>
      <ModalTerms openModal={openTerms} onClose={setOpenTerms} title={"Termos de Responsabilidade"}>
        <TermsResponsibility/>
      </ModalTerms>

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-600 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}
      <div className="space-y-5">
       <div>
          <Label>Nome</Label>
          <Input
            type={"text"}
            name={"name"}
            value={form.name}
            placeholder={"Digite seu nome completo..."}
            onChange={handleChange}
            onBlur={handleNameBlur}
          />
        </div>
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
          <Label>Faça uma breve apresentação sobre você</Label>
          <Textarea
            name="apresentation"
            value={form.apresentation}
            onChange={handleChange}
            placeholder="Digite sua apresentação..."
          />
        </div>

        <div>
          <Label>Digite sua senha</Label>
          <PasswordInput
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Confirme sua senha</Label>
          <PasswordInput
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
          />
        </div>

        <label className="flex items-start gap-3 text-sm text-gray-600">
          <input
            type="checkbox"
            name="term_privacy"
            checked={form.term_privacy}
            onChange={handleChange}
            className="mt-1 h-4 w-4 accent-blue-hover"
          />

          <span>
            Li e concordo com os{" "}
            <button
              type="button"
              onClick={() => setOpenTerms(true)}
              className="text-blue-600 hover:underline font-medium"
            >
              Termos de Responsabilidade
            </button>{" "}
            e com a{" "}
            <button
              type="button"
              onClick={() => setOpenPrivacy(true)}
              className="text-blue-600 hover:underline font-medium"
            >
              Política de Privacidade
            </button>
            .
          </span>
        </label>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600
            text-white font-semibold py-3 rounded-lg
            transition duration-200 shadow-sm hover:shadow-md"
        >
          Registrar conta
        </button>
        <div className="flex justify-center items-center">
          <LinkVariable type={"subtle"} href="/auth/login-teacherUser">
            Já tenho cadastro!
          </LinkVariable>
        </div>
      </div>
    </FormLayout>
  );
};
