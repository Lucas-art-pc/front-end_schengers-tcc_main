import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  showVacancy,
  createVacancy,
  updateVacancy,
} from "../../../api/services/vacancies/vacanciesService";

import { SelectAreas } from "../../../components/SelectAreas";

/* ─── helpers ─── */
function toInputDate(dateStr) {
  if (!dateStr) return "";
  return dateStr.split("T")[0];
}

/* ─── sub-components ─── */
function FieldLabel({ children, required = false }) {
  return (
    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-4">
      {children}
    </p>
  );
}

function Toast({ type, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 shadow-sm text-sm font-medium
        ${
          isSuccess
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}
      >
        <span>{message}</span>
      </div>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-pulse space-y-4">
      <div className="h-4 w-20 bg-gray-100 rounded-full" />
      <div className="h-6 w-48 bg-gray-100 rounded-full" />
      <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <div className="h-3 w-20 bg-gray-100 rounded-full mb-2" />
            <div className="h-10 bg-gray-50 rounded-xl" />
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100">
        <div className="h-3 w-20 bg-gray-100 rounded-full mb-2" />
        <div className="h-28 bg-gray-50 rounded-xl" />
      </div>
    </div>
  );
}

/* ─── page ─── */
export const FormVacancy = () => {
  const { idVacancy } = useParams();
  const navigate = useNavigate();

  const isEditing = !!idVacancy;

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [publicId, setPublicId] = useState(null);
  const [toast, setToast] = useState(null);
  const [statusBtn, setStatusBtn] = useState(false);

  const [form, setForm] = useState({
    title_vacancy: "",
    slug_area: "",
    start_date_vacancy: "",
    requirements_vacancy: "",
    description_vacancy: "",
    tasks_vacancy: "",
    status_vacancy: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isEditing) return;

    const fetchVacancy = async () => {
      try {
        const data = await showVacancy(idVacancy);
        const vacancy = data.vacancy;

        setPublicId(vacancy.public_id);
        setForm({
          title_vacancy: vacancy.title_vacancy ?? "",
          slug_area: vacancy.area?.slug_area ?? "",
          start_date_vacancy: toInputDate(vacancy.start_date_vacancy),
          requirements_vacancy: vacancy.requirements_vacancy ?? "",
          description_vacancy: vacancy.description_vacancy ?? "",
          tasks_vacancy: vacancy.tasks_vacancy ?? "",
          status_vacancy:
            vacancy.status_vacancy === true || vacancy.status_vacancy === 1,
        });
      } catch (error) {
        console.log(error.response);
        setToast({ type: "error", message: "Erro ao carregar vaga." });
      } finally {
        setLoading(false);
      }
    };

    fetchVacancy();
  }, [idVacancy, isEditing]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  }

  function validate() {
    const newErrors = {};
    if (!form.title_vacancy.trim())
      newErrors.title_vacancy = "Informe o título da vaga.";
    if (!form.slug_area)
      newErrors.slug_area = "Selecione uma área.";
    if (!form.start_date_vacancy)
      newErrors.start_date_vacancy = "Informe a data.";
    if (!form.description_vacancy.trim())
      newErrors.description_vacancy = "Informe a descrição.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      if (isEditing) {
        await updateVacancy(publicId, form);
        setStatusBtn(true)
        setToast({ type: "success", message: "Vaga atualizada com sucesso." });
      } else {
        await createVacancy(form);
        setToast({ type: "success", message: "Vaga criada com sucesso." });
      }
      setTimeout(() => navigate("/admin/listVacancies"), 2000);
    } catch (error) {
      console.log(error.response?.data);
      setToast({ type: "error", message: "Erro ao salvar a vaga." });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <PageSkeleton />;

  const inputClass = (field) =>
    `w-full bg-gray-50 border text-sm text-gray-900 rounded-xl px-3.5 py-2.5 outline-none transition-colors
    focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100
    ${errors[field] ? "border-red-300 bg-red-50" : "border-gray-200"}`;

  return (
    <>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="max-w-3xl mx-auto py-8 px-4 space-y-4">
        {/* voltar */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          ← Voltar
        </button>

        {/* cabeçalho */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {isEditing ? "Editar vaga" : "Nova vaga"}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {isEditing
                ? "Atualize as informações da vaga"
                : "Preencha os dados para publicar uma nova vaga"}
            </p>
          </div>
          {isEditing && (
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              Editando
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ── Informações básicas ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
            <SectionLabel>Informações básicas</SectionLabel>

            <div>
              <FieldLabel required>Título da vaga</FieldLabel>
              <input
                type="text"
                value={form.title_vacancy}
                onChange={(e) => handleChange("title_vacancy", e.target.value)}
                placeholder="Ex: Desenvolvedor Full Stack Pleno"
                className={inputClass("title_vacancy")}
              />
              <FieldError message={errors.title_vacancy} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel required>Área</FieldLabel>
                <SelectAreas
                  value={form.slug_area}
                  onChange={(value) => handleChange("slug_area", value)}
                  className={inputClass("slug_area")}
                />
                <FieldError message={errors.slug_area} />
              </div>

              <div>
                <FieldLabel required>Início das candidaturas</FieldLabel>
                <input
                  type="date"
                  value={form.start_date_vacancy}
                  onChange={(e) =>
                    handleChange("start_date_vacancy", e.target.value)
                  }
                  className={inputClass("start_date_vacancy")}
                />
                <FieldError message={errors.start_date_vacancy} />
              </div>
            </div>
          </div>

          {/* ── Descrição ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <SectionLabel>Descrição</SectionLabel>
            <FieldLabel required>Descrição da vaga</FieldLabel>
            <textarea
              rows={5}
              value={form.description_vacancy}
              onChange={(e) =>
                handleChange("description_vacancy", e.target.value)
              }
              placeholder="Descreva a vaga, o contexto e o que o candidato encontrará..."
              className={inputClass("description_vacancy")}
            />
            <div className="flex items-start justify-between mt-1">
              <FieldError message={errors.description_vacancy} />
              <span className="text-xs text-gray-300 ml-auto">
                {form.description_vacancy.length} caracteres
              </span>
            </div>
          </div>

          {/* ── Requisitos + Tarefas ── */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <SectionLabel>Requisitos</SectionLabel>
              <FieldLabel>Liste os requisitos</FieldLabel>
              <textarea
                rows={5}
                value={form.requirements_vacancy}
                onChange={(e) =>
                  handleChange("requirements_vacancy", e.target.value)
                }
                placeholder="Ex: React, Node.js, inglês intermediário..."
                className={inputClass("requirements_vacancy")}
              />
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <SectionLabel>Tarefas</SectionLabel>
              <FieldLabel>Responsabilidades</FieldLabel>
              <textarea
                rows={5}
                value={form.tasks_vacancy}
                onChange={(e) => handleChange("tasks_vacancy", e.target.value)}
                placeholder="Ex: Desenvolver e manter funcionalidades..."
                className={inputClass("tasks_vacancy")}
              />
            </div>
          </div>

          {/* ── Status ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-800">Vaga ativa</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Exibir para os alunos imediatamente após salvar
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={form.status_vacancy}
                onClick={() =>
                  handleChange("status_vacancy", !form.status_vacancy)
                }
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${form.status_vacancy
                    ? "bg-green-500 focus:ring-green-300"
                    : "bg-gray-200 focus:ring-gray-300"
                  }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200
                    ${form.status_vacancy ? "left-6" : "left-1"}`}
                />
              </button>
            </div>
          </div>

          {/* ── Ações ── */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={statusBtn}
              className="bg-blue-primary text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving
                ?  "Salvando..."
                : isEditing
                  ? "Atualizar vaga"
                  : "Criar vaga"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};