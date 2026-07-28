import { useEffect, useState } from "react";
import { listStudents } from "../../../api/services/admin/dataService";

const AVATARS = [
  { bg: "bg-blue-100", color: "text-blue-900" },
  { bg: "bg-yellow-100", color: "text-yellow-900" },
  { bg: "bg-green-100", color: "text-green-900" },
];



function age(dob) {
  const b = new Date(dob),
    today = new Date();
  let a = today.getFullYear() - b.getFullYear();
  if (today < new Date(today.getFullYear(), b.getMonth(), b.getDate())) a--;
  return a;
}

export const ListStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listStudents()
      .then(setStudents)
      .catch(() => setError("Erro ao carregar alunos."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p className="text-slate-400 text-sm">Carregando...</p>;

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
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                Nome
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                E-mail
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                Nascimento
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                Idade
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-slate-400">
                  Nenhum aluno encontrado
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
                          {s.name.substring(0,2).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-700">
                          {s.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{s.email}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {new Date(s.date_of_birth).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-slate-100 text-slate-500 text-xs font-medium px-2.5 py-1 rounded-full">
                        {age(s.date_of_birth)} anos
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400 mt-3">
        {filtered.length} aluno{filtered.length !== 1 ? "s" : ""}
      </p>
    </>
  );
};
