import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Tag, Users, Pencil, EyeOff, Eye } from "lucide-react";
import axios from "axios";
import { showVacancy } from "../../../api/services/vacancies/vacanciesService";// ajuste o caminho do seu service

/* ─── helpers ─── */
function formatDate(dateStr) {
  if (!dateStr) return "—";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

/* ─── sub-components ─── */
function StatusBadge({ active }) {
  return active ? (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-800 border border-green-200">
      <span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block" />
      Ativa
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-red-50 text-red-800 border border-red-200">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
      Encerrada
    </span>
  );
}

function SectionTitle({ children }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-4">
      {children}
    </p>
  );
}

function InfoRow({ label, value, mono = false }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-400 shrink-0">{label}</span>
      <span
        className={`text-sm font-medium text-gray-800 text-right break-all ${
          mono ? "font-mono text-xs text-gray-500" : ""
        }`}
      >
        {value ?? "—"}
      </span>
    </div>
  );
}

function ToggleModal({ active, loading, onConfirm, onCancel }) {
  const willActivate = !active;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${
            willActivate ? "bg-green-50" : "bg-red-50"
          }`}
        >
          {willActivate ? (
            <Eye className="w-5 h-5 text-green-700" />
          ) : (
            <EyeOff className="w-5 h-5 text-red-600" />
          )}
        </div>
        <h2 className="text-base font-semibold text-gray-900 mb-1">
          {willActivate ? "Ativar vaga?" : "Encerrar vaga?"}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {willActivate
            ? "A vaga ficará visível e receberá novas candidaturas."
            : "A vaga será encerrada e não aceitará novas candidaturas."}
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-xl transition-colors disabled:opacity-50 ${
              willActivate
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {loading ? "Aguarde..." : willActivate ? "Ativar" : "Encerrar"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── skeleton ─── */
function PageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-5 animate-pulse">
      <div className="h-4 w-32 bg-gray-100 rounded-full" />
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <div className="h-3 w-16 bg-gray-100 rounded-full" />
        <div className="h-6 w-72 bg-gray-100 rounded-full" />
        <div className="flex gap-2 mt-2">
          <div className="h-6 w-24 bg-gray-100 rounded-full" />
          <div className="h-6 w-40 bg-gray-100 rounded-full" />
        </div>
        <hr className="border-gray-100" />
        <div className="flex gap-2">
          <div className="h-9 w-28 bg-gray-100 rounded-xl" />
          <div className="h-9 w-32 bg-gray-100 rounded-xl" />
          <div className="h-9 w-32 bg-gray-100 rounded-xl" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-100 rounded-full" />
          ))}
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-100 rounded-full" />
          ))}
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-100 rounded-full" />
        ))}
      </div>
    </div>
  );
}

/* ─── main page ─── */
export const VacancyDetails = () => {
  const { idVacancy } = useParams();
  const navigate = useNavigate();

  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("pending");

  const [showModal, setShowModal] = useState(false);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    const fetchVacancie = async () => {
      try {
        const data = await showVacancy(idVacancy);
        console.log(data);
        setVacancy(data.vacancy);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancie();
  }, [idVacancy]);

  useEffect(() => {
    if (vacancy?.status_vacancy !== undefined) {
      setStatus(vacancy.status_vacancy ? "active" : "inactive");
    }
  }, [vacancy]);

  async function handleToggleStatus() {
    setToggling(true);
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/vagas/${vacancy.public_id}/toggle-status`
      );
      const newStatus = data.vacancy?.status_vacancy ?? !vacancy.status_vacancy;
      setVacancy((prev) => ({ ...prev, status_vacancy: newStatus }));
      setStatus(newStatus ? "active" : "inactive");
      setShowModal(false);
    } catch (err) {
      console.error("Erro ao alterar status da vaga:", err);
    } finally {
      setToggling(false);
    }
  }

  if (loading) return <PageSkeleton />;

  if (!vacancy) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a lista
        </button>
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
          <p className="text-gray-400 text-sm">Vaga não encontrada.</p>
        </div>
      </div>
    );
  }

  const isActive = status === "active";

  return (
    <>
      {showModal && (
        <ToggleModal
          active={isActive}
          loading={toggling}
          onConfirm={handleToggleStatus}
          onCancel={() => setShowModal(false)}
        />
      )}

      <div className="max-w-4xl mx-auto py-8 px-4 space-y-5">
        {/* voltar */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a lista
        </button>

        {/* ── Hero ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
                Vaga
              </p>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                {vacancy.title_vacancy}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-100">
                  <Tag className="w-3 h-3" />
                  {vacancy.area?.name_area}
                </span>
                <span className="text-xs font-mono text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                  {vacancy.slug_vacancy}
                </span>
              </div>
            </div>
            <StatusBadge active={isActive} />
          </div>

          <hr className="my-5 border-gray-100" />

          {/* ações */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate(`/admin/vacancyEdit/${vacancy.public_id}`)}
              className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl bg-blue-primary text-white hover:bg-blue-800 transition-colors"
            >
              <Pencil className="w-4 h-4" />
              Editar vaga
            </button>

            <button
              onClick={() => navigate(`/admin/vacancies/${vacancy.public_id}/curriculums`)}
              className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Users className="w-4 h-4" />
              Ver currículos
            </button>

          </div>
        </div>

        {/* ── Grid: detalhes + requisitos ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* detalhes */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <SectionTitle>Detalhes</SectionTitle>
            <InfoRow label="Área" value={vacancy.area?.name_area} />
            <InfoRow label="Status" value={isActive ? "Ativa" : "Encerrada"} />
            <InfoRow
              label="Início das candidaturas"
              value={formatDate(vacancy.start_date_vacancy)}
            />
            <InfoRow label="Slug" value={vacancy.slug_vacancy} mono />
            <InfoRow label="ID público" value={vacancy.public_id} mono />
          </div>

          {/* requisitos */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <SectionTitle>Requisitos</SectionTitle>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {vacancy.requirements_vacancy}
            </p>
          </div>
        </div>

        {/* ── Descrição ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <SectionTitle>Descrição da vaga</SectionTitle>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {vacancy.description_vacancy}
          </p>
        </div>

        {/* ── Tarefas ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <SectionTitle>Tarefas e responsabilidades</SectionTitle>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {vacancy.tasks_vacancy}
          </p>
        </div>
      </div>
    </>
  );
}