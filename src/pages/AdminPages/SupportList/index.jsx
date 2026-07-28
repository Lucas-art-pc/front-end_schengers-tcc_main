import { useEffect, useMemo, useState } from "react";
import { getAllSupports, updateSupportStatus, deleteSupport } from "../../../api/services/support/supportService";

const TYPE_LABELS = {
  falha_plataforma: "Falha na plataforma",
  sugestao_melhoria: "Sugestão de melhoria",
};

// status_support é booleano: false = pendente, true = resolvido.
const STATUS_OPTIONS = [
  { value: false, label: "Pendente" },
  { value: true, label: "Resolvido" },
];

const STATUS_STYLES = {
  false: "bg-amber-50 text-amber-700 border-amber-200",
  true: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function StatusPill({ status }) {
  const style = STATUS_STYLES[String(!!status)];
  const label = status ? "Resolvido" : "Pendente";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${style}`}>
      {label}
    </span>
  );
}

export const AdminSupportList = () => {
  const [supports, setSupports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [typeFilter, setTypeFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [search, setSearch] = useState("");

  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchSupports = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllSupports();
      setSupports(Array.isArray(data) ? data : data?.data ?? []);
    } catch (err) {
      console.log(err)
      setError("Não foi possível carregar as mensagens de suporte.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupports();
  }, []);

  const handleStatusChange = async (public_id, newStatus) => {
    const previous = supports;
    const boolStatus = newStatus === true || newStatus === "true";
    setUpdatingId(public_id);
    // atualização otimista
    setSupports((prev) =>
      prev.map((s) => (s.public_id === public_id ? { ...s, status_support: boolStatus } : s))
    );
    try {
      await updateSupportStatus(public_id, boolStatus);
    } catch (err) {
      console.log(err)
      setSupports(previous);
      setError("Não foi possível atualizar o status. Tente novamente.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (public_id) => {
    setDeletingId(public_id);
    try {
      await deleteSupport(public_id);
      setSupports((prev) => prev.filter((s) => s.public_id !== public_id));
    } catch (err) {
      console.log(err)
      setError("Não foi possível excluir esta mensagem.");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  const filteredSupports = useMemo(() => {
    return supports.filter((s) => {
      const matchesType = typeFilter === "todos" || s.type_support === typeFilter;
      const matchesStatus =
        statusFilter === "todos" || String(!!s.status_support) === statusFilter;
      const term = search.trim().toLowerCase();
      const matchesSearch =
        !term ||
        s.title_support?.toLowerCase().includes(term) ||
        s.student_sender?.name?.toLowerCase().includes(term) ||
        s.student_sender?.email?.toLowerCase().includes(term);
      return matchesType && matchesStatus && matchesSearch;
    });
  }, [supports, typeFilter, statusFilter, search]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#0B2373]">Central de ajuda — Admin</h1>
        <p className="text-slate-500 mt-1">Mensagens enviadas pelos alunos.</p>
      </header>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por título, nome ou e-mail do aluno"
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
        >
          <option value="todos">Todos os tipos</option>
          {Object.entries(TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
        >
          <option value="todos">Todos os status</option>
          {STATUS_OPTIONS.map((o) => (
            <option key={String(o.value)} value={String(o.value)}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-sm text-red-600 mb-4">{error}</p>
      )}

      {loading ? (
        <p className="text-sm text-slate-500">Carregando mensagens...</p>
      ) : filteredSupports.length === 0 ? (
        <div className="text-center py-14 border border-dashed border-slate-300 rounded-xl">
          <p className="text-sm text-slate-500">Nenhuma mensagem encontrada.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredSupports.map((s) => (
            <li
              key={s.public_id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex gap-3 flex-1 min-w-0">
                  {s.student_sender?.url_image_profile ? (
                    <img
                      src={`http://localhost:8000/storage/${s.student_sender.url_image_profile}`}
                      alt={s.student_sender?.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#1E40AF]/10 text-[#1E40AF] flex items-center justify-center font-semibold text-sm shrink-0">
                      {s.student_sender?.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800">{s.student_sender?.name}</p>
                    <p className="text-xs text-slate-400">{s.student_sender?.email}</p>

                    <h3 className="font-medium text-slate-800 mt-2">{s.title_support}</h3>
                    <span className="text-xs text-slate-400">
                      {TYPE_LABELS[s.type_support] || s.type_support}
                    </span>
                    <p className="text-sm text-slate-600 mt-1">{s.message_support}</p>
                    {s.issued_at && (
                      <p className="text-xs text-slate-400 mt-2">
                        {new Date(s.issued_at).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-start sm:items-end gap-2 shrink-0">
                  <StatusPill status={s.status_support} />

                  <select
                    value={String(!!s.status_support)}
                    onChange={(e) => handleStatusChange(s.public_id, e.target.value)}
                    disabled={updatingId === s.public_id}
                    className="rounded-lg border border-slate-300 px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#1E40AF] disabled:opacity-50"
                  >
                    {STATUS_OPTIONS.map((o) => (
                      <option key={String(o.value)} value={String(o.value)}>
                        {o.label}
                      </option>
                    ))}
                  </select>

                  {confirmDeleteId === s.public_id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(s.public_id)}
                        disabled={deletingId === s.public_id}
                        className="text-xs font-medium text-white bg-red-600 hover:bg-red-700 px-2.5 py-1 rounded-lg disabled:opacity-50"
                      >
                        {deletingId === s.public_id ? "Excluindo..." : "Confirmar"}
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="text-xs font-medium text-slate-500 hover:text-slate-700 px-2.5 py-1"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(s.public_id)}
                      className="text-xs font-medium text-red-600 hover:text-red-700"
                    >
                      Excluir
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}