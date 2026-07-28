import { useEffect, useState } from "react";
import { createPlan, updatePlan } from "../../api/services/studyPlans/studyPlans";

export const Modal = ({ onClose, onCreate, daysOfWeek, task }) => {
  const isEditing = !!task;

  const [formTask, setFormTask] = useState({
    activity_study_plan: "",
    description_study_plan: "",
    duration_study_plan: "",
    day_of_week_study_plan: "Segunda-feira",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormTask((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (task) {
      setFormTask({
        activity_study_plan: task.activity_study_plan ?? "",
        description_study_plan: task.description_study_plan ?? "",
        duration_study_plan: task.duration_study_plan ?? "",
        day_of_week_study_plan: task.day_of_week_study_plan ?? "Segunda-feira",
      });
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formTask.activity_study_plan || !formTask.duration_study_plan) return;

    setLoading(true);
    setError(null);

    try {
      if (isEditing) {
        await updatePlan(task.id, formTask);
      } else {
        await createPlan(formTask);
      }
      onCreate();
      onClose();
    } catch (err) {
      setError("Erro ao salvar. Tente novamente.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {isEditing ? "Editar rotina" : "Nova rotina"}
        </h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="activity_study_plan"
            placeholder="Título"
            value={formTask.activity_study_plan}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description_study_plan"
            placeholder="Descrição"
            value={formTask.description_study_plan}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="duration_study_plan"
            placeholder="Duração (min)"
            value={formTask.duration_study_plan}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select
            name="day_of_week_study_plan"
            value={formTask.day_of_week_study_plan}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            {daysOfWeek.map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="text-gray-500"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-primary text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Salvando..." : isEditing ? "Atualizar" : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};