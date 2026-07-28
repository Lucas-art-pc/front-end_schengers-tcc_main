import { useState } from "react";
import { FieldLabel } from "../FieldLabel";
import { FieldError } from "../FieldError";

const EMPTY_ALTERNATIVE = {
  title_alternative: "",
  text_alternative: "",
  correct_alternative: false,
};

const inputBase =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 " +
  "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-150";

const inputError = "border-rose-400 bg-rose-50 focus:ring-rose-400";

// ─────────────────────────────────────────────────────────────────────────────
// ActivityModal — responsabilidade única: formulário de criação/edição
// Estado de lista, save e delete pertencem ao CourseForm (componente pai)
// ─────────────────────────────────────────────────────────────────────────────
export const ActivityModal = ({ initial, onSave, onClose }) => {

  const buildAlternatives = () => {
    if (initial?.alternatives?.length) {
      return initial.alternatives.map((alt) => ({
        id_alternative:      alt.id_alternative      ?? null,
        title_alternative:   alt.title_alternative   ?? "",
        text_alternative:    alt.text_alternative    ?? "",
        correct_alternative: alt.correct_alternative ?? false,
      }));
    }
    return ["A", "B", "C", "D"].map((letter) => ({
      ...EMPTY_ALTERNATIVE,
      title_alternative: letter,
    }));
  };

  const [form, setForm] = useState(
    initial
      ? {
          title_activity:       initial.title_activity       ?? "",
          description_activity: initial.description_activity ?? "",
          question_activity:    initial.question_activity    ?? "",
          alternatives:         buildAlternatives(),
        }
      : {
          title_activity:       "",
          description_activity: "",
          question_activity:    "",
          alternatives: ["A", "B", "C", "D"].map((letter) => ({
            ...EMPTY_ALTERNATIVE,
            title_alternative: letter,
          })),
        },
  );

  const [errors, setErrors] = useState({});

  

  function handleRemoveAlternative(index) {
    setForm((prev) => {
      const alternatives = prev.alternatives
        .filter((_, i) => i !== index)
        .map((alt, i) => ({ ...alt, title_alternative: String.fromCharCode(65 + i) }));
      return { ...prev, alternatives };
    });
  }

  function handleAlternativeChange(index, field, value) {
    setForm((prev) => {
      const alternatives = [...prev.alternatives];
      if (field === "correct_alternative" && value === true) {
        alternatives.forEach((_, i) => {
          alternatives[i] = { ...alternatives[i], correct_alternative: false };
        });
      }
      alternatives[index] = { ...alternatives[index], [field]: value };
      return { ...prev, alternatives };
    });
  }

  // ── Validação e submit ─────────────────────────────────────────────────────

  function handleSave() {
    const e = {};

    if (!form.title_activity || form.title_activity.trim().length < 3)
      e.title_activity = "Título deve ter ao menos 3 caracteres.";

    if (!form.question_activity || form.question_activity.trim().length < 5)
      e.question_activity = "A questão deve ter ao menos 5 caracteres.";

    if (form.alternatives.length < 2)
      e.alternatives = "Adicione ao menos 2 alternativas.";
    else if (form.alternatives.some((a) => !a.text_alternative.trim()))
      e.alternatives = "Preencha o texto de todas as alternativas.";
    else if (!form.alternatives.some((a) => a.correct_alternative))
      e.alternatives = "Marque uma alternativa como correta.";

    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    // Repassa o payload formatado para o pai via prop onSave
    onSave({
      title_activity:       form.title_activity.trim(),
      description_activity: form.description_activity.trim(),
      question_activity:    form.question_activity.trim(),
      alternatives: form.alternatives.map(
        ({ id_alternative, title_alternative, text_alternative, correct_alternative }) => ({
          ...(id_alternative ? { id_alternative } : {}),
          title_alternative,
          text_alternative: text_alternative.trim(),
          correct_alternative,
        }),
      ),
    });
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between shrink-0">
          <h3 className="text-base font-semibold text-gray-900">
            {initial ? "Editar atividade" : "Nova atividade"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>

        <div className="px-6 py-5 space-y-5 overflow-y-auto flex-1">

          {/* Título */}
          <div>
            <FieldLabel htmlFor="title_activity" required>Título da atividade</FieldLabel>
            <input
              id="title_activity"
              type="text"
              value={form.title_activity}
              onChange={(e) => {
                setForm((p) => ({ ...p, title_activity: e.target.value }));
                if (errors.title_activity) setErrors((p) => ({ ...p, title_activity: undefined }));
              }}
              placeholder="Ex: Avaliação do Módulo 1"
              className={`${inputBase} ${errors.title_activity ? inputError : ""}`}
            />
            <FieldError message={errors.title_activity} />
          </div>

          {/* Descrição */}
          <div>
            <FieldLabel htmlFor="description_activity">Descrição</FieldLabel>
            <textarea
              id="description_activity"
              rows={2}
              value={form.description_activity}
              onChange={(e) => setForm((p) => ({ ...p, description_activity: e.target.value }))}
              placeholder="Descreva o objetivo desta atividade..."
              className={`${inputBase} resize-none`}
            />
          </div>

          {/* Questão */}
          <div>
            <FieldLabel htmlFor="question_activity" required>Questão</FieldLabel>
            <textarea
              id="question_activity"
              rows={3}
              value={form.question_activity}
              onChange={(e) => {
                setForm((p) => ({ ...p, question_activity: e.target.value }));
                if (errors.question_activity) setErrors((p) => ({ ...p, question_activity: undefined }));
              }}
              placeholder="Digite o enunciado da questão..."
              className={`${inputBase} resize-none ${errors.question_activity ? inputError : ""}`}
            />
            <FieldError message={errors.question_activity} />
          </div>

          {/* Alternativas */}
          <div>
            

            <div className="space-y-2">
              {form.alternatives.map((alt, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    alt.correct_alternative
                      ? "border-indigo-400 bg-indigo-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleAlternativeChange(index, "correct_alternative", true)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      alt.correct_alternative
                        ? "border-indigo-500 bg-indigo-500"
                        : "border-gray-300 hover:border-indigo-300"
                    }`}
                  >
                    {alt.correct_alternative && (
                      <span className="w-2 h-2 rounded-full bg-white block" />
                    )}
                  </button>

                  <span className="text-xs font-bold text-gray-400 uppercase w-4 shrink-0">
                    {alt.title_alternative}
                  </span>

                  <input
                    type="text"
                    value={alt.text_alternative}
                    onChange={(e) =>
                      handleAlternativeChange(index, "text_alternative", e.target.value)
                    }
                    placeholder={`Texto da alternativa ${alt.title_alternative}`}
                    className="flex-1 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-300 min-w-0"
                  />

                  {form.alternatives.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAlternative(index)}
                      className="text-gray-300 hover:text-rose-400 text-lg leading-none transition-colors shrink-0"
                      title="Remover alternativa"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-2">
              Clique no círculo para marcar a alternativa correta.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
          >
            {initial ? "Salvar alterações" : "Adicionar atividade"}
          </button>
        </div>
      </div>
    </div>
  );
};