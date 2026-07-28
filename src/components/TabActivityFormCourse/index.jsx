export const TabActivityFormCourse = ({
  activities,
  activeTab,
  setActivityModal,
  deletingActivity,
  setDeletingActivity,
  handleDeleteActivity,
}) => {
  if (activeTab !== "atividades") return null;

  return (
    
            <div className="px-6 py-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-gray-400">
                  {activities.length === 0
                    ? "Nenhuma atividade cadastrada ainda."
                    : `${activities.length} atividade${activities.length !== 1 ? "s" : ""}`}
                </p>
                <button
                  onClick={() => setActivityModal("new")}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
                >
                  + Nova atividade
                </button>
              </div>

              {activities.length === 0 ? (
                <div className="py-10 text-center rounded-xl border-2 border-dashed border-gray-100">
                  <div className="text-3xl mb-2">📝</div>
                  <p className="text-sm font-medium text-gray-500">
                    Nenhuma atividade ainda
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Clique em "+ Nova atividade" para começar.
                  </p>
                </div>
                ) : (
                <div className="space-y-2">
                  {activities.map((act) => (
                    <div
                      key={act.public_id}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-600 text-xs font-bold flex items-center justify-center shrink-0">
                        📝
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {act.title_activity}
                          </p>
                          {act.is_completed && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600 font-medium shrink-0">
                              Concluída
                            </span>
                          )}
                        </div>
                        {act.description_activity && (
                          <p className="text-xs text-gray-400 mt-0.5 truncate max-w-sm">
                            {act.description_activity}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <button
                          onClick={() => setActivityModal(act)}
                          className="px-3 py-1.5 rounded-lg text-xs text-indigo-600 hover:bg-indigo-100 font-medium transition-colors"
                        >
                          Editar
                        </button>
                        {deletingActivity === act.public_id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                handleDeleteActivity(act.public_id)
                              }
                              className="px-3 py-1.5 rounded-lg text-xs text-white bg-rose-500 hover:bg-rose-600 font-medium transition-colors"
                            >
                              Confirmar
                            </button>
                            <button
                              onClick={() => setDeletingActivity(null)}
                              className="px-2 py-1.5 rounded-lg text-xs text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeletingActivity(act.public_id)}
                            className="px-3 py-1.5 rounded-lg text-xs text-rose-500 hover:bg-rose-50 font-medium transition-colors"
                          >
                            Excluir
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
)}
            </div>
          )
        
}