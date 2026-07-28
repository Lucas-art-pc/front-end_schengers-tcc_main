import { useEffect, useState } from "react";
import {
  ClipboardList,
  Bell,
  Clock,
  CalendarDays,
  Loader2,
  Inbox,
} from "lucide-react";
import { getTasksTeacher } from "../../../api/services/teachers/teacherService";
const FILTERS = [
  { key: "all", label: "Todos" },
  { key: "task", label: "Tarefas" },
  { key: "notification", label: "Notificações" },
];

function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

export const NotificationTeacher = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let active = true;

    async function fetchItems() {
      setLoading(true);
      setError(null);
      try {
        const data = await getTasksTeacher();

        if (active) setItems(data.data);
      } catch (err) {
        if (active) {
          setError(
            err?.response?.data?.message ||
              "Não foi possível carregar suas mensagens.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchItems();
    return () => {
      active = false;
    };
  }, []);

  console.log(items)

  const filteredItems = Array.isArray(items)
  ? items.filter((item) => {
      if (filter === "all") return true;
      return item.type_task === filter;
    })
  : [];

  console.log(filteredItems.data)

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold text-[#0B2373] mb-1">
        Tarefas e notificações
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Acompanhe tudo que você recebeu da coordenação.
      </p>

      <div className="flex gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filter === f.key
                ? "border-[#1E40AF] bg-[#1E40AF]/5 text-[#1E40AF]"
                : "border-gray-200 text-gray-500 hover:border-gray-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <Loader2 size={24} className="animate-spin" />
        </div>
      )}

      {!loading && error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {!loading && !error && filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Inbox size={32} className="mb-2" />
          <p className="text-sm">
            Nenhum {filter === "notification" ? "notificação" : "item"}{" "}
            encontrado.
          </p>
        </div>
      )}

      {!loading && !error && filteredItems.length > 0 && (
        <ul className="space-y-3">
          {filteredItems.map((item) => {

            
            
            const isTask = item.type_task === "task";

            return (
              <li
                key={item.public_id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`shrink-0 rounded-full p-2 ${
                      isTask
                        ? "bg-[#1E40AF]/10 text-[#1E40AF]"
                        : "bg-yellow-primary/15 text-yellow-primary"
                    }`}
                  >
                    {isTask ? <ClipboardList size={18} /> : <Bell size={18} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-sm font-semibold text-gray-800 truncate">
                        {item.title_task}
                      </h2>
                      <span className="text-xs text-gray-400 shrink-0">
                        {formatDate(item.send_date)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-1">
                      {item.description_task}
                    </p>

                    {isTask && (
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        {item.deadline_task && (
                          <span className="flex items-center gap-1">
                            <CalendarDays size={14} />
                            Prazo: {formatDate(item.deadline_task)}
                          </span>
                        )}
                        {item.time_task && (
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {item.time_task}h de carga horária
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
