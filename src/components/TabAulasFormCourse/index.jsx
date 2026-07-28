import { AlignLeft, Clock, Pencil, Trash2, Video, X } from "lucide-react";

export const TabAulasFormCourse = ({
  classes,
  activeTab,
  setClassModal,
  deletingClass,
  setDeletingClass,
  handleDeleteClass,
}) => {
  if (activeTab !== "aulas") return null;

  return (
    <div className="px-6 py-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">
          {classes.length === 0
            ? "Nenhuma aula cadastrada ainda."
            : `${classes.length} aula${classes.length !== 1 ? "s" : ""}`}
        </p>
        <button
          onClick={() => setClassModal("new")}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
        >
          + Nova aula
        </button>
      </div>

      {classes.length === 0 ? (
        <div className="py-10 text-center rounded-xl border-2 border-dashed border-gray-100">
          <div className="text-3xl mb-2">🎬</div>
          <p className="text-sm font-medium text-gray-500">Nenhuma aula ainda</p>
          <p className="text-xs text-gray-400 mt-1">
            Clique em "+ Nova aula" para começar.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {classes.map((cls, index) => (
            <div
              key={cls.public_id}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl border border-gray-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/20 transition-all duration-200 group"
            >
              <span className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 text-xs font-bold flex items-center justify-center shrink-0 border border-indigo-100">
                {index + 1}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {cls.title_class}
                  </p>
                  {cls.is_completed && (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium border border-emerald-100 shrink-0">
                      <Check size={9} strokeWidth={2.5} />
                      Concluída
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-400">
                  {cls.duration_class && (
                    <span className="flex items-center gap-1">
                      <Clock size={11} className="text-gray-300" />
                      {cls.duration_class} min
                    </span>
                  )}
                  {cls.url_class && (
                    <span className="flex items-center gap-1">
                      <Video size={11} className="text-gray-300" />
                      Vídeo
                    </span>
                  )}
                  {cls.description_class && (
                    <span className="flex items-center gap-1 truncate max-w-xs">
                      <AlignLeft size={11} className="text-gray-300 shrink-0" />
                      <span className="truncate">{cls.description_class}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0">
                {deletingClass === cls.public_id ? (
                  <>
                    <button
                      onClick={() => handleDeleteClass(cls.public_id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 transition-colors"
                    >
                      <Trash2 size={11} />
                      Confirmar
                    </button>
                    <button
                      onClick={() => setDeletingClass(null)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setClassModal(cls)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      <Pencil size={11} />
                      Editar
                    </button>
                    <button
                      onClick={() => setDeletingClass(cls.public_id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-500 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 size={11} />
                      Excluir
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};