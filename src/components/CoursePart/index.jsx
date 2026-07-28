import { FieldLabel } from "../FieldLabel";
import { FieldError } from "../FieldError";
import { FieldHint } from "../FieldHint";
import { SelectAreas } from "../SelectAreas";
import { Typograph } from "../Typograph";


const inputBase =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 " +
  "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-150";

const inputError = "border-rose-400 bg-rose-50 focus:ring-rose-400";

export function CoursePart({
  form,
  errors,
  loading,
  submitError,
  imagePreview,
  isEditing,
  onChange,
  onImageChange,
  onRemoveImage,
  onToggleActive,
  onSubmit,
  onReset,
  onCancel,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* 01 — Identificação */}
      <div className="px-8 pt-8 pb-6 border-b border-gray-100">
        <Typograph tag="paragraph" className="mb-4 text-gray-500">
          01 — Identificação
        </Typograph>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <FieldLabel htmlFor="slug_area" required>
              Área
            </FieldLabel>
            <SelectAreas
              value={form.slug_area}
              onChange={(slug) =>
                onChange({ target: { name: "slug_area", value: slug } })
              }
            />
            <FieldError message={errors.slug_area} />
          </div>
          <div>
            <FieldLabel htmlFor="duration_course" required>
              Duração (horas)
            </FieldLabel>
            <input
              id="duration_course"
              name="duration_course"
              type="number"
              min={1}
              value={form.duration_course}
              onChange={onChange}
              placeholder="Ex: 40"
              className={`${inputBase} ${errors.duration_course ? inputError : ""}`}
            />
            <FieldError message={errors.duration_course} />
            <FieldHint>Mínimo de 1 hora.</FieldHint>
          </div>
        </div>
      </div>

      {/* 02 — Conteúdo */}
      <div className="px-8 py-6 border-b border-gray-100">
        <Typograph tag="paragraph" className="mb-4 text-gray-500">
          02 — Conteúdo
        </Typograph>

        <div className="mb-5">
          <FieldLabel htmlFor="url_image_course">Imagem de capa</FieldLabel>
          <input
            id="url_image_course"
            type="file"
            accept="image/jpeg,image/png,image"
            onChange={onImageChange}
            className="hidden"
          />
          {imagePreview ? (
            <div className="relative rounded-xl overflow-hidden border border-gray-200 h-44 group">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <label
                  htmlFor="url_image_course"
                  className="cursor-pointer px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-medium hover:bg-gray-100 transition-colors"
                >
                  Trocar
                </label>
                <button
                  type="button"
                  onClick={onRemoveImage}
                  className="px-3 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-medium hover:bg-rose-600 transition-colors"
                >
                  Remover
                </button>
              </div>
            </div>
          ) : (
            <label
              htmlFor="url_image_course"
              className={`flex flex-col items-center justify-center h-44 rounded-xl border-2 border-dashed cursor-pointer transition-colors
                ${errors.image ? "border-rose-300 bg-rose-50" : "border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/40"}`}
            >
              <div className="text-3xl mb-2">🖼️</div>
              <p className="text-sm font-medium text-gray-600">
                Clique para enviar uma imagem
              </p>
              <p className="text-xs text-gray-400 mt-1">
                JPG, PNG ou WEBP • Máximo 2MB
              </p>
            </label>
          )}
          <FieldError message={errors.image} />
        </div>

        <div className="mb-5">
          <FieldLabel htmlFor="title_course" required>
            Título do curso
          </FieldLabel>
          <input
            id="title_course"
            name="title_course"
            type="text"
            maxLength={255}
            value={form.title_course}
            onChange={onChange}
            placeholder="Ex: Introdução ao React com TypeScript"
            className={`${inputBase} ${errors.title_course ? inputError : ""}`}
          />
          <div className="flex items-start justify-between mt-1.5">
            <FieldError message={errors.title_course} />
            <span
              className={`text-xs ml-auto ${form.title_course.length > 230 ? "text-rose-400" : "text-gray-400"}`}
            >
              {form.title_course.length}/255
            </span>
          </div>
        </div>

        <div>
          <FieldLabel htmlFor="description_course" required>
            Descrição
          </FieldLabel>
          <textarea
            id="description_course"
            name="description_course"
            rows={4}
            value={form.description_course}
            onChange={onChange}
            placeholder="Descreva o conteúdo, objetivos e público-alvo do curso..."
            className={`${inputBase} resize-none leading-relaxed ${errors.description_course ? inputError : ""}`}
          />
          <div className="flex items-start justify-between mt-1.5">
            <FieldError message={errors.description_course} />
            <span
              className={`text-xs ml-auto ${form.description_course.length < 10 && form.description_course.length > 0 ? "text-rose-400" : "text-gray-400"}`}
            >
              {form.description_course.length} car.
            </span>
          </div>
        </div>
      </div>

      {/* 03 — Configurações */}
      <div className="px-8 py-6">
        <Typograph tag="paragraph" className="mb-4 text-gray-500">
          03 — Configurações
        </Typograph>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Curso ativo</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Cursos ativos ficam visíveis para os alunos na plataforma.
            </p>
          </div>
          <button
            type="button"
            onClick={onToggleActive}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${form.active_course ? "bg-indigo-600" : "bg-gray-200"}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${form.active_course ? "translate-x-6" : "translate-x-1"}`}
            />
          </button>
        </div>
        <div
          className={`mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${form.active_course ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${form.active_course ? "bg-emerald-500" : "bg-gray-400"}`}
          />
          {form.active_course ? "Visível para alunos" : "Oculto para alunos"}
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {!isEditing && (
            <button
              type="button"
              disabled={loading}
              onClick={onReset}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-40"
            >
              Limpar campos
            </button>
          )}
          {submitError && (
            <p className="text-xs text-rose-600 flex items-center gap-1">
              <span>⚠</span> {submitError}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {isEditing && (
            <button
              type="button"
              disabled={loading}
              onClick={onCancel}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-40"
            >
              Cancelar
            </button>
          )}
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="px-7 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold shadow-sm transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                {isEditing ? "Salvando..." : "Criando..."}
              </span>
            ) : isEditing ? (
              "Salvar alterações →"
            ) : (
              "Criar curso →"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
