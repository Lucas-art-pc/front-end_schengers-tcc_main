import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { approveCurriculum, rejectCurriculum, showCurriculumByVacancy } from "../../../api/services/admin/dataService";

const STATUS_CONFIG = {
  pending: {
    label: "Pendente",
    classes: "bg-amber-100 text-amber-800 border border-amber-200",
    dot: "bg-amber-400",
  },
  approved: {
    label: "Aprovado",
    classes: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    dot: "bg-emerald-400",
  },
  rejected: {
    label: "Rejeitado",
    classes: "bg-red-100 text-red-800 border border-red-200",
    dot: "bg-red-400",
  },
};

const EDUCATION_LABELS = {
  tecnico: "Técnico",
  graduacao: "Graduação",
  "pos-graduacao": "Pós-Graduação",
  mestrado: "Mestrado",
  doutorado: "Doutorado",
};

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function AvatarInitials({ name, size = "md" }) {
  const initials = getInitials(name);
  const palette = [
    "bg-violet-100 text-violet-700",
    "bg-sky-100 text-sky-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
  ];
  const color = palette[name.charCodeAt(0) % palette.length];
  const sz =
    size === "xl"
      ? "w-20 h-20 text-2xl"
      : size === "lg"
        ? "w-14 h-14 text-lg"
        : "w-10 h-10 text-sm";
  return (
    <div
      className={`${sz} ${color} rounded-full flex items-center justify-center font-bold shrink-0`}
    >
      {initials}
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${cfg.classes}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
      {children}
    </h3>
  );
}

function InfoItem({ icon, label, value, href }) {
  const icons = {
    phone: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    ),
    mail: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
    link: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    ),
    globe: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
      />
    ),
    book: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    ),
  };

  const inner = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-blue-600 hover:underline font-medium truncate"
    >
      {value}
    </a>
  ) : (
    <span className="text-sm text-gray-800 font-medium">{value}</span>
  );

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {icons[icon]}
        </svg>
      </div>
      <span className="text-xs text-gray-400 w-20 shrink-0">{label}</span>
      {inner}
    </div>
  );
}

function DocumentCard({ label, path }) {
  // Deriva um nome de arquivo legível do path
  const filename = path.split("/").pop();
  const ext = filename.split(".").pop().toUpperCase();

  return (
    <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-4">
      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
        <svg
          className="w-5 h-5 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {ext} · {filename}
        </p>
      </div>
      <a
        href={`https://schengers-backend-production.up.railway.app${path}`}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 text-xs font-medium text-blue-600 hover:text-blue-800 bg-white border border-blue-100
                   px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
      >
        Ver
      </a>
    </div>
  );
}


function ConfirmModal({ type, candidateName, vacancyTitle, onConfirm, onCancel }) {
  const isApprove = type === "approve";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ícone + título */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
              isApprove ? "bg-emerald-100" : "bg-red-100"
            }`}
          >
            <span className={`text-lg ${isApprove ? "text-emerald-700" : "text-red-700"}`}>
              {isApprove ? "✓" : "✕"}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              {isApprove ? "Aprovar candidato?" : "Rejeitar candidato?"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Esta ação poderá ser desfeita depois.</p>
          </div>
        </div>

        {/* Descrição */}
        <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 rounded-xl p-3 mb-5">
          Você está {isApprove ? "aprovando" : "rejeitando"} o currículo de{" "}
          <strong className="text-gray-800">{candidateName}</strong> para a vaga{" "}
          <strong className="text-gray-800">{vacancyTitle}</strong>.
          {" "}O candidato será notificado.
        </p>

        {/* Botões */}
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 text-sm text-gray-500 hover:text-gray-800 border border-gray-200
                       rounded-xl transition-colors hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors ${
              isApprove
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isApprove ? "Confirmar aprovação" : "Confirmar rejeição"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export const CurriculumDetails = () => {
  const { idCurriculum } = useParams();
  const navigate = useNavigate();
  const [curriculum, setCurriculum] = useState(null); // objeto único, não array
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("pending");
  const [modal, setModal] = useState(null); // null | "approve" | "reject"

  useEffect(() => {
    const fetchCurriculum = async () => {
      try {
        const data = await showCurriculumByVacancy(idCurriculum);
        console.log(data); // confirme a estrutura aqui
        setCurriculum(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculum();
  }, [idCurriculum]);

  useEffect(() => {
    if (curriculum?.status) setStatus(curriculum.status);
  }, [curriculum]);

  if (loading) return <p className="text-slate-400 text-sm">Carregando...</p>;
  if (!curriculum)
    return <p className="text-slate-400 text-sm">Candidato não encontrado.</p>;

const handleApprove = () => setModal("approve");
const handleReject = () => setModal("reject");

const confirmApprove = async () => {
  try {
    await approveCurriculum(idCurriculum);
    setStatus("approved");
  } catch (err) {
    console.error("Erro ao aprovar:", err);
  } finally {
    setModal(null);
  }
};

const confirmReject = async () => {
  try {
    await rejectCurriculum(idCurriculum);
    setStatus("rejected");
  } catch (err) {
    console.error("Erro ao rejeitar:", err);
  } finally {
    setModal(null);
  }
};


  return (
    <>
    {modal && (
      <ConfirmModal
        type={modal}
        candidateName={curriculum.name}
        vacancyTitle={curriculum.vacancy.title}
        onConfirm={modal === "approve" ? confirmApprove : confirmReject}
        onCancel={() => setModal(null)}
      />
    )}
    
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Voltar para a lista
      </button>

      {/* ── Hero card ── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-start gap-5">
          <AvatarInitials name={curriculum.name} size="xl" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  {curriculum.name}
                </h1>
                <p className="text-sm text-gray-500 mt-1">{curriculum.email}</p>
              </div>
              <StatusBadge status={status} />
            </div>

            {/* Vaga */}
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full font-medium">
                {curriculum.vacancy.title}
              </span>
              <span className="text-xs text-gray-400">
                ID #{curriculum.public_id}
              </span>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-3 mt-6 pt-5 border-t border-gray-100">
          <button
            onClick={handleApprove}
            disabled={status === "approved"}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed
                       text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            ✓ Aprovar candidato
          </button>
          <button
            onClick={handleReject}
            disabled={status === "rejected"}
            className="flex-1 bg-white hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed
                       text-red-600 text-sm font-semibold py-2.5 rounded-xl transition-colors
                       border border-red-200"
          >
            ✕ Rejeitar candidato
          </button>
        </div>
      </div>

      {/* ── Grid de seções ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contato */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <SectionTitle>Contato</SectionTitle>
          <InfoItem icon="phone" label="Telefone" value={curriculum.phone} />
          <InfoItem icon="mail" label="E-mail" value={curriculum.email} />
          {curriculum.linkedin && (
            <InfoItem
              icon="link"
              label="LinkedIn"
              value="Ver perfil"
              href={curriculum.linkedin}
            />
          )}
          {curriculum.portfolio && (
            <InfoItem
              icon="globe"
              label="Portfólio"
              value="Ver portfólio"
              href={curriculum.portfolio}
            />
          )}
        </div>

        {/* Formação */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <SectionTitle>Formação Acadêmica</SectionTitle>
          <div className="space-y-3">
            {[
              {
                label: "Nível",
                value:
                  EDUCATION_LABELS[curriculum.education_level] ||
                  curriculum.education_level,
              },
              { label: "Instituição", value: curriculum.institution },
              { label: "Curso", value: curriculum.course },
              { label: "Conclusão", value: curriculum.graduation_year },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
              >
                <span className="text-sm text-gray-400">{label}</span>
                <span className="text-sm font-semibold text-gray-800">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Experiência */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:col-span-2">
          <SectionTitle>Experiência Profissional</SectionTitle>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {curriculum.professional_experience}
          </p>
        </div>

        {/* Habilidades */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <SectionTitle>Habilidades</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {curriculum.skills.split(",").map((skill) => (
              <span
                key={skill}
                className="text-xs bg-blue-50 text-blue-700 border border-blue-100
                           px-3 py-1.5 rounded-full font-medium"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Indicado por */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <SectionTitle>Usuário do currículo</SectionTitle>
          <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
            <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              {getInitials(curriculum.teacher.name)}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {curriculum.teacher.name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {curriculum.teacher.email}
              </p>
            </div>
          </div>
        </div>

        {/* Documentos */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:col-span-2">
          <SectionTitle>Documentos</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DocumentCard
              label="Documento Pessoal"
              path={curriculum.personal_document}
            />
            <DocumentCard
              label="Documento Profissional"
              path={curriculum.professional_document}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
