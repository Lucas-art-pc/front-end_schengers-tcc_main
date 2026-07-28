import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { curriculumByVacancy } from "../../../api/services/admin/dataService";

// ─── Mock data baseado na resposta da API ────────────────────────────────────


// ─── Helpers ─────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  pending: {
    label: "Pendente",
    className: "bg-amber-100 text-amber-800",
    dot: "bg-amber-400",
  },
  approved: {
    label: "Aprovado",
    className: "bg-green-100 text-green-800",
    dot: "bg-green-400",
  },
  rejected: {
    label: "Reprovado",
    className: "bg-red-100 text-red-800",
    dot: "bg-red-400",
  },
};

const EDUCATION_LABELS = {
  fundamental: "Ensino Fundamental",
  medio: "Ensino Médio",
  tecnico: "Técnico",
  graduacao: "Graduação",
  "pos-graduacao": "Pós-Graduação",
  mestrado: "Mestrado",
  doutorado: "Doutorado",
};

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function formatPhone(phone = "") {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  if (digits.length === 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return phone;
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

// ─── CandidatoCard ────────────────────────────────────────────────────────────
function CandidatoCard({ curriculum, onVerDetalhes }) {
  const initials = getInitials(curriculum.name);
  const educationLabel =
    EDUCATION_LABELS[curriculum.education_level] || curriculum.education_level;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {curriculum.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{curriculum.email}</p>
          </div>
        </div>
        <StatusBadge status={curriculum.status} />
      </div>

      {/* Info grid */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>{formatPhone(curriculum.phone)}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-600">
          <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
          <span className="truncate">
            {educationLabel} — {curriculum.course} ({curriculum.institution},{" "}
            {curriculum.graduation_year})
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-600">
          <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Inscrito em {curriculum.created_at}</span>
        </div>

        {curriculum.teacher && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>
              Currículo enviado pelo usuário(a){" "}
              <span className="font-medium text-gray-800">
                {curriculum.teacher.name}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Skills */}
      {curriculum.skills && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {curriculum.skills
            .split(",")
            .slice(0, 4)
            .map((skill) => (
              <span
                key={skill.trim()}
                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md"
              >
                {skill.trim()}
              </span>
            ))}
          {curriculum.skills.split(",").length > 4 && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-md">
              +{curriculum.skills.split(",").length - 4}
            </span>
          )}
        </div>
      )}

      {/* Footer actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {curriculum.linkedin && (
            <a
              href={curriculum.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
          {curriculum.portfolio && (
            <a
              href={curriculum.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
              title="Portfólio"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
        <href
          onClick={() => onVerDetalhes()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          Ver detalhes
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </href>
      </div>
    </div>
  );
}

// ─── StatsBar ─────────────────────────────────────────────────────────────────
function StatsBar({ curriculums }) {
  const total = curriculums.length;
  const pending = curriculums.filter((c) => c.status === "pending").length;
  const approved = curriculums.filter((c) => c.status === "approved").length;
  const rejected = curriculums.filter((c) => c.status === "rejected").length;

  const stats = [
    { label: "Total", value: total, className: "text-gray-900" },
    { label: "Pendentes", value: pending, className: "text-amber-700" },
    { label: "Aprovados", value: approved, className: "text-green-700" },
    { label: "Reprovados", value: rejected, className: "text-red-700" },
  ];

  return (
    <div className="flex items-center gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className={`text-2xl font-bold ${stat.className}`}>{stat.value}</p>
          <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export const ListCurriculum = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vaga, setVaga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [busca, setBusca] = useState("");

  useEffect(() => {
      const fetchCourseData = async () => {
        try {
          const data = await curriculumByVacancy(id);
          console.log(data)
    
          if (!data) {
            console.error("Curso não encontrado.");
            return;
          }
    
          setVaga(data);
        } catch (error) {
          console.error(error);
          console.error("Erro ao carregar o curso. Tente novamente.");
        } finally {
          setLoading(false);
        }
      };
    
      fetchCourseData();
    }, [id]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!vaga) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <p className="text-gray-500">Vaga não encontrada.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline"
        >
          Voltar
        </button>
      </div>
    );
  }

  const curriculumsFiltrados = vaga.curriculums.filter((c) => {
    const matchStatus = filtroStatus === "todos" || c.status === filtroStatus;
    const matchBusca =
      busca.trim() === "" ||
      c.name.toLowerCase().includes(busca.toLowerCase()) ||
      c.email.toLowerCase().includes(busca.toLowerCase()) ||
      c.skills?.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchBusca;
  });

  return (
    <div className="space-y-6">
      {/* Cabeçalho da vaga */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <button
            onClick={() => navigate(-1)}
            className="mt-0.5 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0"
            aria-label="Voltar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-gray-900">{vaga.title}</h1>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  vaga.status
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {vaga.status ? "Ativa" : "Encerrada"}
              </span>
            </div>
            <p className="text-sm text-gray-400 font-mono">{vaga.slug}</p>
          </div>
        </div>
        <StatsBar curriculums={vaga.curriculums} />
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nome, e-mail ou habilidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>
        <div className="flex gap-2">
          {[
            { value: "todos", label: "Todos" },
            { value: "pending", label: "Pendentes" },
            { value: "approved", label: "Aprovados" },
            { value: "rejected", label: "Reprovados" },
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

      {/* Grid de candidatos */}
      {curriculumsFiltrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm text-gray-500">Nenhum currículo encontrado.</p>
          {(busca || filtroStatus !== "todos") && (
            <button
              onClick={() => { setBusca(""); setFiltroStatus("todos"); }}
              className="text-xs text-blue-600 hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </div>
      ) : (
        <>
          <p className="text-xs text-gray-400">
            {curriculumsFiltrados.length}{" "}
            {curriculumsFiltrados.length === 1 ? "candidato" : "candidatos"} encontrado
            {curriculumsFiltrados.length !== 1 && "s"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {curriculumsFiltrados.map((curriculum) => (
            
              <CandidatoCard
                key={curriculum.public_id}
                curriculum={curriculum}
                onVerDetalhes={() =>
                  navigate(`${curriculum.public_id}`)
                }
              />
              
            ))}
          </div>
        </>
      )}
    </div>
  );
}