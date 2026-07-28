import { useEffect, useState } from "react";
import { ClipboardList, Bell, Send, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { sendTask } from "../../../api/services/admin/dataService";

/**
 * Formulário único que envia para tb_task, alternando entre:
 *  - type_task: "task"          -> title_task, description_task, deadline_task, time_task
 *  - type_task: "notification"  -> title_task, description_task
 *
 * Campos batem com a validação do Laravel:
 * fk_id_teacher | required | exists:tb_teacher,id
 * title_task        | required
 * description_task  | required|string|min:5
 * deadline_task      | date               (só enviado quando type_task = task)
 * time_task    | integer|max_digits:2  (horas do curso, só quando type_task = task)
 * type_task          | required|in:task,notification
 */
export const FormTaskTeacher = () => {
  const [typeTask, setTypeTask] = useState("task"); // "task" | "notification"
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: "success" | "error", text: string }
  const { idTeacher } = useParams();

  const [form, setForm] = useState({
    title_task: "",
    description_task: "",
    deadline_task: "",
    time_task: "",
  });

  useEffect(() => {
  if (!feedback) return;
  const timer = setTimeout(() => setFeedback(null), 3000);
  return () => clearTimeout(timer); // limpa se o componente desmontar ou feedback mudar antes do tempo
}, [feedback]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleTypeChange(newType) {
    setTypeTask(newType);
    // limpa os campos que não pertencem ao novo tipo
    if (newType === "notification") {
      setForm((prev) => ({ ...prev, deadline_task: "", time_task: "" }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFeedback(null);
    setLoading(true);

    const payload = {
      title_task: form.title_task,
      description_task: form.description_task,
      type_task: typeTask,
      ...(typeTask === "task" && {
        deadline_task: form.deadline_task,
        time_task: form.time_task,
      }),
    };

    try {
      await sendTask(idTeacher, payload);
      setForm({
        title_task: "",
        description_task: "",
        deadline_task: "",
        time_task: "",
      });
      setFeedback({
        type: "success",
        text:
          typeTask === "task"
            ? "Tarefa enviada com sucesso!"
            : "Notificação enviada com sucesso!",
      });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Não foi possível enviar. Tente novamente.";
      setFeedback({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h1 className="text-xl font-semibold text-[#0B2373] mb-1">
        Enviar para o professor
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Escolha se deseja enviar uma tarefa ou apenas uma notificação.
      </p>

      {/* Seletor de type_task */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() => handleTypeChange("task")}
          className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-colors ${
            typeTask === "task"
              ? "border-[#1E40AF] bg-[#1E40AF]/5 text-[#1E40AF]"
              : "border-gray-200 text-gray-500 hover:border-gray-300"
          }`}
        >
          <ClipboardList size={18} />
          Tarefa
        </button>

        <button
          type="button"
          onClick={() => handleTypeChange("notification")}
          className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-colors ${
            typeTask === "notification"
              ? "border-[#1E40AF] bg-[#1E40AF]/5 text-[#1E40AF]"
              : "border-gray-200 text-gray-500 hover:border-gray-300"
          }`}
        >
          <Bell size={18} />
          Notificação
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campos comuns aos dois tipos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {typeTask === "task" ? "Título" : "Assunto"}
          </label>
          <input
            type="text"
            name="title_task"
            value={form.title_task}
            onChange={handleChange}
            required
            placeholder={
              typeTask === "task"
                ? "Ex: Corrigir atividade da turma 2A"
                : "Ex: Alteração no calendário"
            }
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:border-[#1E40AF]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {typeTask === "task" ? "Descrição" : "Mensagem"}
          </label>
          <textarea
            name="description_task"
            value={form.description_task}
            onChange={handleChange}
            required
            minLength={5}
            rows={typeTask === "task" ? 4 : 5}
            placeholder={
              typeTask === "task"
                ? "Detalhe o que precisa ser feito..."
                : "Escreva a mensagem que o professor vai receber..."
            }
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:border-[#1E40AF]"
          />
        </div>

        {/* Campos exclusivos de task */}
        {typeTask === "task" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prazo
              </label>
              <input
                type="date"
                name="deadline_task"
                value={form.deadline_task}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:border-[#1E40AF]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carga horária do curso (horas)
              </label>
              <input
                type="number"
                name="time_task"
                value={form.time_task}
                onChange={handleChange}
                min={0}
                max={99}
                placeholder="Ex: 40"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:border-[#1E40AF]"
              />
            </div>
          </>
        )}

        {feedback && (
          <p
            className={`text-sm ${
              feedback.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedback.text}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#1E40AF] hover:bg-[#0B2373] disabled:opacity-60 text-white text-sm font-medium py-2.5 transition-colors"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
          {typeTask === "task" ? "Enviar tarefa" : "Enviar notificação"}
        </button>
      </form>
    </div>
  );
};
