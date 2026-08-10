import { useEffect, useState } from "react";
import { FormLayout } from "../../../layouts/FormLayout";
import { storeCurriculum } from "../../../api/services/curriculum/curriculumService";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../../components/Input";
import { InputFile } from "../../../components/InputFile";
import {
  stepValidators,
  validateFile,
} from "../../../validators/candidateFormValidators";
import { Label } from "../../../components/Label";
import { Typograph } from "../../../components/Typograph";

// Etapas
const STEPS = [
  "Dados Pessoais",
  "Formação",
  "Experiência & Habilidades",
  "Documentos",
];

const EDUCATION_LEVELS = [
  { value: "graduacao", label: "Graduação" },
  { value: "pos-graduacao", label: "Pós-Graduação" },
  { value: "mestrado", label: "Mestrado" },
  { value: "doutorado", label: "Doutorado" },
];

const INITIAL_FORM = {
  // Dados Pessoais
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  portfolio: "",
  // Formação
  education_level: "",
  institution: "",
  course: "",
  graduation_year: "",
  // Experiência & Habilidades
  professional_experience: "",
  skills: "",
  // Documentos
  personal_document: null,
  professional_document: null,
};

export const CurriculumForm = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: null }));
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const { name, files } = e.target;
    const error = validateFile(files[0]);

    setErrors((prev) => ({ ...prev, [name]: error }));
    if (!error) setForm((prev) => ({ ...prev, [name]: files[0] }));
  };
  const validateStep = () =>
    Object.fromEntries(
      Object.entries(stepValidators[step](form)).filter(([, v]) => v !== null),
    );

  const handleNext = () => {
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") formData.append(key, value);
    });

    try {
      setLoading(true);
      await storeCurriculum(id, formData);
      setSuccess(true);
    } catch (err) {
      const serverErrors = err.response?.data?.errors;
      if (serverErrors) setErrors(serverErrors);
      else
        setErrors({ general: "Erro ao enviar o currículo. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  // No componente:

  useEffect(() => {
    if (success) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timer = setTimeout(() => {
        navigate("/teacher/vacancies");
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [success, navigate]);

  // No return:
  if (success) {
    return (
      <FormLayout title="Currículo Enviado!">
        <p className="text-center text-green-600 font-medium">
          Sua candidatura foi enviada com sucesso.
        </p>
        <Typograph tag="subtitle" className="text-center text-gray-500 ">
          Em caso de aprovação, você receberá um e-mail.
        </Typograph>
        <p className="text-center text-gray-500 text-sm mt-2">
          Redirecionando para vagas em {countdown}s...
        </p>
      </FormLayout>
    );
  }

  return (
    <FormLayout
      title={STEPS[step]}
      description={`Etapa ${step + 1} de ${STEPS.length}`}
      onSubmit={
        step === STEPS.length - 1
          ? handleSubmit
          : (e) => {
              e.preventDefault();
              handleNext();
            }
      }
    >
      {/* Barra de progresso */}

      <div className="flex gap-1 mb-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${
              i <= step ? "bg-blue-primary" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {errors.general && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {errors.general}
        </div>
      )}

      {/* ── Etapa 0: Dados Pessoais ── */}
      {step === 0 && (
        <>
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium text-gray-700">
              Nome completo <span className="text-red-700">*</span>
            </Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Digite seu nome completo..."
            />
            {errors.name && (
              <span className="text-xs text-red-500">{errors.name}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium text-gray-700">
              E-mail <span className="text-red-700">*</span>
            </Label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Digite seu email..."
            />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Telefone <span className="text-red-700">*</span>
            </label>
            <Input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
            />
            {errors.phone && (
              <span className="text-xs text-red-500">{errors.phone}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium text-gray-700">
              LinkedIn
            </Label>
            <Input
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/seu-perfil"
            />
            {errors.linkedin && (
              <span className="text-xs text-red-500">{errors.linkedin}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Portfólio
            </label>
            <Input
              name="portfolio"
              value={form.portfolio}
              onChange={handleChange}
              placeholder="https://seuportfolio.com"
            />
            {errors.portfolio && (
              <span className="text-xs text-red-500">{errors.portfolio}</span>
            )}
          </div>
        </>
      )}

      {/* ── Etapa 1: Formação ── */}
      {step === 1 && (
        <>
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium text-gray-700">
              Nível de Formação <span className="text-red-700">*</span>
            </Label>
            <select
              name="education_level"
              value={form.education_level}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-primary"
            >
              <option value="">Selecione...</option>
              {EDUCATION_LEVELS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.education_level && (
              <span className="text-xs text-red-500">
                {errors.education_level}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium text-gray-700">
              Instituição <span className="text-red-700">*</span>
            </Label>
            <Input
              name="institution"
              value={form.institution}
              onChange={handleChange}
              placeholder="Digite a instituição que se formou..."
            />
            {errors.institution && (
              <span className="text-xs text-red-500">{errors.institution}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium text-gray-700">
              Curso <span className="text-red-700">*</span>{" "}
            </Label>
            <Input name="course" value={form.course} onChange={handleChange} />
            {errors.course && (
              <span className="text-xs text-red-500">{errors.course}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Ano de Conclusão
            </label>
            <Input
              name="graduation_year"
              value={form.graduation_year}
              onChange={handleChange}
              placeholder="2024"
              maxLength={4}
            />
            {errors.graduation_year && (
              <span className="text-xs text-red-500">
                {errors.graduation_year}
              </span>
            )}
          </div>
        </>
      )}

      {/* ── Etapa 2: Experiência & Habilidades ── */}
      {step === 2 && (
        <>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Experiência Profissional <span className="text-red-700">*</span>
            </label>
            <textarea
              name="professional_experience"
              value={form.professional_experience}
              onChange={handleChange}
              rows={4}
              placeholder="Descreva suas experiências anteriores..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-primary resize-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Habilidades <span className="text-red-700">*</span>
            </label>
            <textarea
              name="skills"
              value={form.skills}
              onChange={handleChange}
              rows={3}
              placeholder="Ex: React, Laravel, comunicação, trabalho em equipe..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-primary resize-none"
            />
            {errors.skills && (
              <span className="text-xs text-red-500">{errors.skills}</span>
            )}
          </div>
        </>
      )}

      {/* ── Etapa 3: Documentos ── */}
      {step === 3 && (
        <>
          <div>
            <Typograph tag="paragraph" className="text-yellow-primary text-center font-bold">
              Solicitamos a documentação abaixo para habilitação de ensino
            </Typograph>
          </div>
          <InputFile
            label="Documento Pessoal (ex: CNH, RG...) *"
            name="personal_document"
            error={errors.personal_document}
            onChange={handleFile}
          />
          <InputFile
            label="Documento Profissional (ex: Certificado de formação...) *"
            name="professional_document"
            error={errors.professional_document}
            onChange={handleFile}
          />
        </>
      )}

      {/* Navegação */}
      <div className="flex justify-between pt-2">
        {step > 0 ? (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 text-sm text-gray-500 hover:text-blue-primary transition"
          >
            ← Voltar
          </button>
        ) : (
          <div />
        )}

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-primary hover:opacity-90 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition"
        >
          {loading
            ? "Enviando..."
            : step === STEPS.length - 1
              ? "Enviar"
              : "Próximo →"}
        </button>
      </div>
    </FormLayout>
  );
};
