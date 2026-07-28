import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { deletePlan, getPlans } from "../../../api/services/studyPlans/studyPlans";
import { Modal } from "../../../components/Modal";

const daysOfWeek = [
  "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira",
  "Sexta-feira", "Sábado", "Domingo",
];

const emptyWeek = () => Object.fromEntries(daysOfWeek.map((day) => [day, []]));

const groupByDay = (flatTasks) => {
  const grouped = emptyWeek();

  flatTasks.forEach((task) => {
    if (grouped[task.day_of_week_study_plan]) {
      grouped[task.day_of_week_study_plan].push({
        id: task.id,
        activity_study_plan: task.activity_study_plan,
        description_study_plan: task.description_study_plan,
        duration_study_plan: task.duration_study_plan,
        day_of_week_study_plan: task.day_of_week_study_plan,
      });
    }
  });

  return grouped;
};

export const StudyPlans = () => {
  const [tasks, setTasks] = useState(emptyWeek());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const data = await getPlans();
        setTasks(groupByDay(data));
      } catch (err) {
        setError("Erro ao carregar as tarefas.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [refresh]);

  const deleteStudyPlan = async (id) => {
    try {
      await deletePlan(id);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Erro ao deletar plano:", error);
    }
  };

  const handleCreate = () => {
    setRefresh((prev) => !prev);
    setIsModalOpen(false);
  };

  if (loading)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Carregando rotina...
      </div>
    );

  if (error)
    return (
      <div className="flex-1 flex items-center justify-center text-red-400">
        {error}
      </div>
    );

  return (
    <div className="flex-1 p-6 space-y-6 overflow-x-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Rotina Semanal</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:opacity-90"
        >
          <Plus size={16} />
          Adicionar rotina
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 min-w-225">
        {daysOfWeek.map((day) => (
          <div key={day} className="bg-gray-100 rounded-xl p-3 shadow-sm min-h-50">
            <h2 className="font-semibold text-center mb-3 text-gray-700">{day}</h2>

            <div className="space-y-3">
              {tasks[day].map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition group"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm text-gray-800">
                      {task.activity_study_plan}
                    </h3>
                    {task.duration_study_plan && (
                      <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        {task.duration_study_plan} min
                      </span>
                    )}
                  </div>

                  {task.description_study_plan && (
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      {task.description_study_plan}
                    </p>
                  )}

                  <div className="flex justify-end gap-2 mt-3 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="text-xs text-gray-400 hover:text-blue-500"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteStudyPlan(task.id)}
                      className="text-xs text-gray-400 hover:text-red-500"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}

              {tasks[day].length === 0 && (
                <div className="flex items-center justify-center h-20 border border-dashed rounded-lg">
                  <p className="text-xs text-gray-400">Sem tarefas</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {(isModalOpen || editingTask) && (
        <Modal
          task={editingTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          onCreate={handleCreate}
          daysOfWeek={daysOfWeek}
        />
      )}
    </div>
  );
};