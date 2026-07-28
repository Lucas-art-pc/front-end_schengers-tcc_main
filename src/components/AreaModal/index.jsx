import { useState } from "react";
import { darken, lighten } from "../../validators/colorsAreaValidator";

const PRESET_COLORS = [
  { hex: "#3B82F6", label: "Azul" },
  { hex: "#10B981", label: "Verde" },
  { hex: "#F59E0B", label: "Âmbar" },
  { hex: "#EF4444", label: "Vermelho" },
  { hex: "#8B5CF6", label: "Violeta" },
  { hex: "#EC4899", label: "Rosa" },
  { hex: "#06B6D4", label: "Ciano" },
  { hex: "#F97316", label: "Laranja" },
];

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const AreaModal = ({ open, onClose, onCreate }) => {
  const [name, setName]   = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0].hex);
  const [error, setError] = useState("");

  function handleCreate() {
    
    if (!name.trim()) { setError("Informe o nome da área."); return; }
    onCreate({ name_area: name.trim(), slug_area: slugify(name), color_area: color });
    setName(""); setColor(PRESET_COLORS[0].hex); setError(""); onClose();
  }

  function handleClose() {
    setName(""); setColor(PRESET_COLORS[0].hex); setError(""); onClose();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Nova área de curso</h2>
            <p className="text-xs text-gray-400 mt-0.5">Preencha o nome e escolha uma cor para o dashboard.</p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fechar"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Nome */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Nome da área
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder="ex: Desenvolvimento Web"
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border outline-none transition-all ${
                error
                  ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-50"
              } text-gray-900 placeholder-gray-300`}
              autoFocus
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            {name && (
              <p className="text-xs text-gray-400 font-mono">
                slug: <span className="text-gray-500">{slugify(name)}</span>
              </p>
            )}
          </div>

          {/* Cor */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Cor do dashboard
            </label>

            <div className="flex gap-2 flex-wrap">
              {PRESET_COLORS.map(({ hex, label }) => (
                <button
                  key={hex}
                  onClick={() => setColor(hex)}
                  title={label}
                  aria-label={label}
                  className="w-7 h-7 rounded-full transition-transform hover:scale-110 focus:outline-none"
                  style={{
                    backgroundColor: hex,
                    boxShadow: color === hex ? `0 0 0 2px white, 0 0 0 4px ${hex}` : "none",
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <label className="cursor-pointer relative" title="Cor personalizada">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="sr-only"
                />
                <span
                  className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: color }}
                >
                  <svg className="w-3 h-3 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </label>
              <span className="text-xs text-gray-400 font-mono">{color} — personalizada</span>
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Pré-visualização
            </label>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: lighten(color, 0.82),
                  color: darken(color, 0.5),
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                {name.trim() || "Nome da área"}
              </span>
              <span className="text-xs text-gray-400">→ badge no dashboard</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 text-sm font-medium text-white rounded-xl transition-all active:scale-95"
            style={{ backgroundColor: color }}
          >
            Criar área
          </button>
        </div>
      </div>
    </div>
  );
}
