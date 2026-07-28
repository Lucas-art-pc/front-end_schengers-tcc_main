import { useState } from "react";
import { FieldLabel } from "../FieldLabel";
import { FieldError } from "../FieldError";
import { generateEmbed } from "../../validators/uploadVideoCourse";

const EMPTY_CLASS_FORM = {
  title_class: "",
  description_class: "",
  explication_class: "",
  url_class: "",
  duration_class: "",
};

const inputBase =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 " +
  "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-150";

const inputError = "border-rose-400 bg-rose-50 focus:ring-rose-400";

export const ClassModal = ({ initial, onSave, onClose }) => {
  const [form, setForm] = useState(
    initial
      ? {
          title_class: initial.title_class ?? "",
          description_class: initial.description_class ?? "",
          explication_class: initial.explication_class ?? "",
          url_class: initial.url_class ?? "",
          duration_class: initial.duration_class ?? "",
        }
      : { ...EMPTY_CLASS_FORM },
  );
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSave() {
    const e = {};

    if (!form.title_class || form.title_class.length < 3)
      e.title_class = "Título deve ter ao menos 3 caracteres.";

    if (!form.url_class) {
      e.url_class = "URL é obrigatória.";
    } else {
      const result = generateEmbed(form.url_class, {
        autoplay: false,
        mute: false,
        controls: true,
        loop: false,
        modestbranding: true,
        privacy: true,
      });

      if (!result.success) {
        e.url_class = result.error;
      }
    }

    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    const result = generateEmbed(form.url_class, {
      autoplay: false,
      mute: false,
      controls: true,
      loop: false,
      modestbranding: true,
      privacy: true,
    });

    const updatedForm = {
      ...form,
      url_class: result.embedUrl
    };
    console.log(updatedForm);
    setForm(updatedForm);
    onSave(updatedForm);
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">
            {initial ? "Editar aula" : "Nova aula"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <FieldLabel htmlFor="duration_class">Duração (min)</FieldLabel>
            <input
              id="duration_class"
              name="duration_class"
              type="number"
              min={1}
              value={form.duration_class}
              onChange={handleChange}
              placeholder="Ex: 30"
              className={inputBase}
            />
          </div>
          <div>
            <FieldLabel htmlFor="title_class" required>
              Título
            </FieldLabel>
            <input
              id="title_class"
              name="title_class"
              type="text"
              value={form.title_class}
              onChange={handleChange}
              placeholder="Ex: Introdução ao módulo"
              className={`${inputBase} ${errors.title_class ? inputError : ""}`}
            />
            <FieldError message={errors.title_class} />
          </div>
          <div>
            <FieldLabel htmlFor="description_class">
              Descrição da aula
            </FieldLabel>
            <textarea
              id="description_class"
              name="description_class"
              rows={3}
              value={form.description_class}
              onChange={handleChange}
              placeholder="Descreva o conteúdo desta aula..."
              className={`${inputBase} resize-none`}
            />
          </div>
          <div>
            <FieldLabel htmlFor="explication_class">
              Explicação sobre a aula
            </FieldLabel>
            <textarea
              id="explication_class"
              name="explication_class"
              rows={3}
              value={form.explication_class}
              onChange={handleChange}
              placeholder="Descreva o conteúdo desta aula..."
              className={`${inputBase} resize-none`}
            />
          </div>
          <div>
            <FieldLabel htmlFor="url_class">URL do vídeo</FieldLabel>
            <input
              id="url_class"
              name="url_class"
              type="url"
              value={form.url_class}
              onChange={handleChange}
              placeholder="https://youtube.com/watch?v=..."
              className={inputBase}
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
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
            {initial ? "Salvar alterações" : "Adicionar aula"}
          </button>
        </div>
      </div>
    </div>
  );
};
