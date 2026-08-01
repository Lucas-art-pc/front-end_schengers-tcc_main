import { useParams, useNavigate } from "react-router-dom";
import { Typograph } from "../../../components/Typograph";
import { useEffect, useState } from "react";
import { showVacancy } from "../../../api/services/vacancies/vacanciesService";
import { ArrowLeft } from "lucide-react";

export const VacanciePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vacancie, setVacancie] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVacancie = async () => {
      try {
        const data = await showVacancy(id);
        setVacancie(data.vacancy);
        setCandidate(data.already_applied);
      } catch (error) {
        console.error(error);
        setError("Erro ao carregar a vaga.");
      } finally {
        setLoading(false);
      }
    };

    fetchVacancie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const requisitos = vacancie.requirements_vacancy.split(",");
  const responsabilidades = vacancie.tasks_vacancy.split(",");

  if (error || !vacancie) {
    return (
      <div className="p-10 text-center text-red-500">
        {error || "Vaga não encontrada."}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-20 lg:w-64 bg-blue-primary text-white flex flex-col shrink-0">
        <div className="p-6">
          <Typograph tag="title" className="text-white">
            Schengers
          </Typograph>
        </div>

        <nav className="flex-1 px-4 mt-4">
          <button
            onClick={() => navigate("/teacher/vacancies")}
            className="w-full flex items-center gap-3 p-3 hover:bg-blue-600 rounded-xl transition"
          >
            <ArrowLeft size={18} />
            <span className="text-sm hidden lg:inline">Voltar para vagas</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-12 max-w-6xl mx-auto w-full">
        <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* HEADER */}
          <header className="bg-linear-to-r from-blue-primary to-blue-700 p-10 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {vacancie.area?.name_area}
              </span>
              <span className="text-sm text-blue-100">
                Início:{" "}
                {vacancie.start_date_vacancy
                  ? new Date(vacancie.start_date_vacancy).toLocaleDateString(
                      "pt-BR",
                    )
                  : "—"}
              </span>
            </div>

            <Typograph tag="title_large">{vacancie.title_vacancy}</Typograph>

            <div className="flex items-center gap-2 mt-2">
              <span
                className={`text-xs px-3 py-1 rounded-full font-bold ${
                  vacancie.status_vacancy
                    ? "bg-green-400/30 text-green-100"
                    : "bg-red-400/30 text-red-100"
                }`}
              >
                {vacancie.status_vacancy ? "Vaga Ativa" : "Vaga Encerrada"}
              </span>
            </div>
          </header>

          {/* BODY */}
          <div className="p-8 md:p-10 grid md:grid-cols-3 gap-10">
            {/* ESQUERDA */}
            <div className="md:col-span-2 space-y-10">
              <section>
                <Typograph tag="title" className="text-gray-800 mb-4">
                  Sobre a vaga
                </Typograph>
                <p className="text-gray-600 leading-relaxed">
                  {vacancie.description_vacancy ||
                    "Nenhuma descrição disponível."}
                </p>
              </section>

              <section>
                <Typograph tag="title" className="text-gray-800 mb-4">
                  Requisitos
                </Typograph>
                <p className="text-gray-600 leading-relaxed">
                  <ul>
                    {requisitos.length > 0 ? (
                      requisitos.map((requisito, index) => (
                        <li key={index}> - {requisito.trim()}</li>
                      ))
                    ) : (
                      <li>Nenhum requisito informado.</li>
                    )}
                  </ul>
                </p>
              </section>

              <section>
                <Typograph tag="title" className="text-gray-800 mb-4">
                  Atividades
                </Typograph>
                <p className="text-gray-600 leading-relaxed">
                  <ul>
                    {responsabilidades.length > 0 ? (
                      responsabilidades.map((requisito, index) => (
                        <li key={index}> - {requisito.trim()}</li>
                      ))
                    ) : (
                      <li>Nenhuma responsabilidade informada.</li>
                    )}
                  </ul>
                </p>
              </section>
            </div>

            {/* DIREITA */}
            <aside className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-bold mb-4">
                  Informações da vaga
                </p>

                <div className="space-y-5">
                  <div>
                    <span className="text-xs text-gray-400">Área</span>
                    <p className="text-gray-700 font-medium capitalize">
                      {vacancie.area?.name_area}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-gray-400">
                      Data de início
                    </span>
                    <p className="text-gray-700">
                      {vacancie.start_date_vacancy
                        ? new Date(
                            vacancie.start_date_vacancy,
                          ).toLocaleDateString("pt-BR")
                        : "—"}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-gray-400">Status</span>
                    <p
                      className={`font-semibold ${vacancie.status_vacancy ? "text-green-600" : "text-red-500"}`}
                    >
                      {vacancie.status_vacancy ? "Ativa" : "Encerrada"}
                    </p>
                  </div>
                </div>

                <button
                  disabled={candidate}
                  onClick={() =>
                    navigate(
                      `/teacher/vacancie/${vacancie.public_id}/curriculum`,
                    )
                  }
                  className="mt-6 w-full bg-blue-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {candidate ? "Currículo já enviado!" : "Candidatar-se"}
                </button>
              </div>
            </aside>
          </div>
        </article>
      </main>
    </div>
  );
};
