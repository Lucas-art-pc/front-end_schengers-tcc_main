import { useEffect, useState } from "react";
import { listCourses } from "../../../api/services/admin/dataService";

const AVATARS = [
  { bg: "bg-blue-100", color: "text-blue-900" },
  { bg: "bg-yellow-100", color: "text-yellow-900" },
  { bg: "bg-green-100", color: "text-green-900" },
];


export const ListCourses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listCourses()
      .then(setCourses)
      .catch(() => setError("Erro ao carregar cursos."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = courses.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.slug.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p className="text-slate-400 text-sm">Carregando...</p>;

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-blue-primary">Cursos</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Lista de cursos
          </p>
        </div>
        <input
          className="border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 w-56"
          placeholder="Buscar curso..."
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
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                Título
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                Duração
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                Área de curso
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                Professor
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                Quantidade Aulas
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                Quantidade Atividades
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-slate-400">
                  Nenhum curso encontrado
                </td>
              </tr>
            ) : (
              filtered.map((s, i) => {
                const av = AVATARS[i % AVATARS.length];
                return (
                  <tr
                    key={s.title}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${av.bg} ${av.color}`}
                        >
                          {s.title.substring(0,2).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-700">
                          {s.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{s.duration}h</td>
                    <td className="px-4 py-3 text-slate-600">
                      <span className={`${s.active == true ? "bg-green-600" : "bg-red-600"} text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full`}>
                        {s.active == true ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {s.area.name}
                    </td>

                    <td className="px-4 py-3 text-slate-400">{s.teacher.name}</td>

                    <td className="px-4 py-3 text-slate-400">{s.total_classes}</td>
                    <td className="px-4 py-3 text-slate-400">{s.total_activities}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400 mt-3">
        {filtered.length} curso{filtered.length !== 1 ? "s" : ""}
      </p>
    </>
  );
};
