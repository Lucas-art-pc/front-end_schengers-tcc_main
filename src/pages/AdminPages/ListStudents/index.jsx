import { useEffect, useState } from "react";
import { listStudents } from "../../../api/services/admin/dataService";

const AVATARS = [
  { bg: "bg-blue-100", color: "text-blue-900" },
  { bg: "bg-yellow-100", color: "text-yellow-900" },
  { bg: "bg-green-100", color: "text-green-900" },
];

function age(dob) {
  if (!dob) return "-";
  const b = new Date(dob),
    today = new Date();
  let a = today.getFullYear() - b.getFullYear();
  if (today < new Date(today.getFullYear(), b.getMonth(), b.getDate())) a--;
  return a;
}

export const ListStudents = () => {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true);
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    let cancelled = false;

    listStudents(page, debouncedSearch)
      .then((res) => {
        if (cancelled) return;
        setStudents(res.data ?? []);
        setPagination({
          current_page: res.current_page ?? 1,
          last_page: res.last_page ?? 1,
          total: res.total ?? 0,
        });
        setError(null);
      })
      .catch(() => {
        if (!cancelled) setError("Erro ao carregar alunos.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, debouncedSearch]);

  const goToPage = (p) => {
    setLoading(true);
    setPage(p);
  };

  const { total, last_page: lastPage, current_page: currentPage } = pagination;

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-blue-primary">Alunos</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Lista de alunos cadastrados
          </p>
        </div>
        <input
          className="border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 w-56"
          placeholder="Buscar aluno..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200">
          {error}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              {["Nome", "E-mail", "Nascimento", "Idade"].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={loading ? "opacity-50 transition-opacity" : ""}>
            {loading && students.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-slate-400">
                  Carregando...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-slate-400">
                  Nenhum aluno encontrado
                </td>
              </tr>
            ) : (
              students.map((s, i) => {
                const av = AVATARS[i % AVATARS.length];
                return (
                  <tr
                    key={s.id}
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
                    <td className="px-4 py-3 text-slate-600">
                      {s.date_of_birthday?.split("-").reverse().join("/")}
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-slate-100 text-slate-500 text-xs font-medium px-2.5 py-1 rounded-full">
                        {age(s.date_of_birthday)} anos
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-slate-400">
          {total} aluno{total !== 1 ? "s" : ""}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goToPage(Math.max(1, page - 1))}
            disabled={page <= 1 || loading}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span className="text-xs text-slate-500">
            Página {currentPage} de {lastPage}
          </span>
          <button
            onClick={() => goToPage(Math.min(lastPage, page + 1))}
            disabled={page >= lastPage || loading}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Próxima
          </button>
        </div>
      </div>
    </>
  );
};