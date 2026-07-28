import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { vacanciesAdmin } from "../../../api/services/admin/dataService";

// ─── Mock data ────────────────────────────────────────────────────────────────


function VagaCard({ vaga, onSelecionar }) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all duration-200 cursor-pointer group"
      onClick={() => onSelecionar(vaga.public_id)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors truncate">
            {vaga.title_vacancy}
          </h3>
          <p className="text-xs text-gray-400 font-mono mt-0.5 truncate">
            {vaga.slug_vacancy}
          </p>
        </div>
        <span
          className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${
            vaga.status_vacancy
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {vaga.status_vacancy ? "Ativa" : "Encerrada"}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          Criada em {new Date(vaga.start_date_vacancy).toLocaleDateString('pt-BR')}
        </span>
        <span className="flex items-center gap-1 text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Ver currículos
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export const ListVacancyCurriculum = () => {
  const navigate = useNavigate();

  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");

  useEffect(() => {
    vacanciesAdmin()
      .then((data) => {
         setVacancies(Array.isArray(data) ? data : []);
      })
      .catch(() => console.error("Erro ao carregar cursos."))
      .finally(() => setLoading(false));
   
  }, []);

  console.log(vacancies)

  

  const vagasFiltradas = vacancies.filter((v) => {
    const matchStatus =
      filtroStatus === "todos" ||
      (filtroStatus === "ativas" && v.status) ||
      (filtroStatus === "encerradas" && !v.status);
    const matchBusca =
      busca.trim() === "" ||
      v.title.toLowerCase().includes(busca.toLowerCase()) ||
      v.slug.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchBusca;
  });

 

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Currículos enviados por vaga
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Selecione uma vaga para ver os currículos recebidos
          </p>
        </div>

        {/* Stats rápidas */}
        <div className="flex items-center gap-5">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{vacancies.length}</p>
            <p className="text-xs text-gray-500">Vagas</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            
            <p className="text-xs text-gray-500">Candidatos</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
        </div>
      </div>

      {/* Legenda + Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar vaga..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>
        <div className="flex gap-2">
          {[
            { value: "todos", label: "Todas" },
            { value: "ativas", label: "Ativas" },
            { value: "encerradas", label: "Encerradas" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFiltroStatus(f.value)}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filtroStatus === f.value
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de vagas */}
      {vagasFiltradas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <svg
            className="w-12 h-12 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm text-gray-500">Nenhuma vaga encontrada.</p>
          {(busca || filtroStatus !== "todos") && (
            <button
              onClick={() => {
                setBusca("");
                setFiltroStatus("todos");
              }}
              className="text-xs text-blue-600 hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </div>
      ) : (
        <>
          <p className="text-xs text-gray-400">
            {vagasFiltradas.length}{" "}
            {vagasFiltradas.length === 1
              ? "vaga encontrada"
              : "vagas encontradas"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {vagasFiltradas.map((vaga) => (
              <VagaCard
                key={vaga.public_id}
                vaga={vaga}
                onSelecionar={(id) =>
                  navigate(`/admin/vacancies/${id}/curriculums`)
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
