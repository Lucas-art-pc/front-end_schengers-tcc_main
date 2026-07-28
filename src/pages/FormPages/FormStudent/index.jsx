import { FormLayout } from "../../../layouts/FormLayout";
import { Input } from "../../../components/Input";
import { Label } from "../../../components/Label";
import { LinkVariable } from "../../../components/Link";
import { createStudent } from "../../../api/services/auth/studentAuthService";
import { PasswordInput } from "../../../components/PassworInput";
import { useRegister } from "../../../hooks/useRegister";
import { useState } from "react";
import { ModalTerms } from "../../../components/ModalTerms";
import { PrivacyPolicy } from "../../../components/PrivacyPolicy";
import { nameFormat } from "../../../validators/studentFormValidator";

const INITIAL_FORM = {
  name: "",
  email: "",
  date_of_birthday: "",
  term_privacy: false,
  password: "",
  password_confirmation: "",
};

export const FormStudent = () => {
  const [openPrivacy, setOpenPrivacy] = useState();
  
  const { form, error, loading, handleChange, handleSubmit, formatField} = useRegister({
    
    registerFn: createStudent,
    initialForm: INITIAL_FORM,
    redirectTo: "/auth/login-student",

    
  });


  const handleNameBlur = () => formatField("name", nameFormat);

  return (
    <FormLayout
      title="Cadastro de aluno"
      description="Preencha os dados para criar sua conta"
      onSubmit={handleSubmit}
    >
      <ModalTerms
        openModal={openPrivacy}
        onClose={setOpenPrivacy}
        title={"Política de Privacidade"}
      >
        <PrivacyPolicy />
      </ModalTerms>
      {/* Mensagem de erro geral */}
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
          <Label>Email</Label>
          <Input
            type={"text"}
            name={"email"}
            value={form.email}
            placeholder={"Digite seu email completo..."}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Data de nascimento</Label>
          <Input
            type={"date"}
            name={"date_of_birthday"}
            placeholder={"Digite sua data de nascimento..."}
            value={form.date_of_birthday}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Senha</Label>
          <PasswordInput
            type={"password"}
            name={"password"}
            value={form.password}
            placeholder={"Digite sua senha..."}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Confirme sua senha</Label>
          <PasswordInput
            type={"password"}
            name={"password_confirmation"}
            value={form.password_confirmation}
            placeholder={"Confirme sua senha..."}
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
            Li e concordo com a{" "}
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
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600
            text-white font-semibold py-3 rounded-lg
            transition duration-200 shadow-sm hover:shadow-md
            disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Entrando..." : "Registrar"}
        </button>
      </div>

      <div className="flex justify-center items-center">
        <LinkVariable type={"subtle"} href="/auth/login-student">
          Já sou aluno!
        </LinkVariable>
      </div>
    </FormLayout>
  );
};
