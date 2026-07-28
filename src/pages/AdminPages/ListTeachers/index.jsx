import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Send } from "lucide-react";
import { listTeachers } from "../../../api/services/admin/dataService";

const AVATARS = [
  { bg: "bg-blue-100", color: "text-blue-900" },
  { bg: "bg-yellow-100", color: "text-yellow-900" },
  { bg: "bg-green-100", color: "text-green-900" },
];

const STATUS_STYLES = {
  approved: "bg-green-50 text-green-700 border border-green-200",
  reproved: "bg-red-50 text-red-700 border border-red-200",
};

export const ListTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listTeachers()
      .then(setTeachers)
      .catch(() => setError("Erro ao carregar professores."))
      .finally(() => setLoading(false));
  }, []);

  

  const filtered = teachers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-blue-primary">Professores</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Lista de professores cadastrados
          </p>
        </div>

        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
          />
          <input
            className="border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 w-64"
            placeholder="Buscar professor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200">
          {error}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/60">
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                Nome
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                E-mail
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                Apresentação
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                Status
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse shrink-0" />
                      <div className="h-3 w-28 rounded bg-slate-100 animate-pulse" />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-3 w-36 rounded bg-slate-100 animate-pulse" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-3 w-40 rounded bg-slate-100 animate-pulse" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-5 w-20 rounded-full bg-slate-100 animate-pulse" />
                  </td>
                  <td className="px-4 py-3" />
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-slate-400">
                  Nenhum professor encontrado
                </td>
              </tr>
            ) : (
              filtered.map((s, i) => {
                const av = AVATARS[i % AVATARS.length];
                return (
                  <tr
                    key={s.email}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${av.bg} ${av.color}`}
                        >
                          {s.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-700">
                          {s.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{s.email}</td>
                    <td className="px-4 py-3 text-slate-600 max-w-xs truncate">
                      {s.apresentation}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          STATUS_STYLES[s.status] ??
                          "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {s.status === "approved" ? "Aprovado" : "Reprovado"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/admin/${s.public_id}/sendTaskMessageTeacher`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-primary border border-blue-100 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Send size={13} />
                        Enviar mensagem
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {!loading && (
        <p className="text-xs text-slate-400 mt-3">
          {filtered.length} professor{filtered.length !== 1 ? "es" : ""}
        </p>
      )}
    </>
  );
};