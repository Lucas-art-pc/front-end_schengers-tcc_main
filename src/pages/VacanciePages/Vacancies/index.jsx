import { useEffect, useState } from "react";
import { Typograph } from "../../../components/Typograph";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import { indexVacancies } from "../../../api/services/vacancies/vacanciesService";
import { dataUser } from "../../../api/services/auth/dataUser";
import { useLogout } from "../../../hooks/useLogout";

export const Vacancies = () => {
  const [search, setSearch] = useState("");
  const [vacancies, setVacancies] = useState([]);
  const [user, setUser] = useState(null);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiMessage, setApiMessage] = useState("");
  const navigate = useNavigate();

  const { handleLogout } = useLogout()

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        setLoading(true);
        setError(null);
        const [userData, vacanciesData] = await Promise.all([
          dataUser(),
          indexVacancies(),
        ]);
        setUser(userData);
        const list = Array.isArray(vacanciesData?.data ?? vacanciesData)
          ? (vacanciesData?.data ?? vacanciesData)
          : [];

        setVacancies(list);
        setApiMessage(vacanciesData?.message ?? "");
      } catch (err) {
        setError("Erro ao carregar as vagas. Tente novamente.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, []);

  console.log(vacancies, user);

  const filteredJobs = vacancies.filter((job) => {
    const matchesSearch = job.title_vacancy
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesType = type === "" || job.area?.slug_area === type;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <header className="mb-8 flex items-start justify-between">
          <div>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              <ArrowLeft size={18} />
              Voltar
            </button>

            <Typograph tag="title_large" className="text-blue-primary">
              Olá, {user?.name}!
            </Typograph>
            <Typograph className="text-gray-600 mt-1">
              Encontre sua próxima oportunidade de ensino
            </Typograph>
          </div>

          
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-blue-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
            >
              <LogOut />
            </button>
         
        </header>

        {/* --- FILTROS SUPERIORES --- */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-50">
            <input
              type="text"
              placeholder="Buscar disciplina..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-primary"
            />
          </div>

          <div className="w-full sm:w-48">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-primary"
            >
              <option value="">Todos os tipos</option>
              <option value="programacao">Programação</option>
              <option value="desing">Desing</option>
              <option value="marketing-digital">Marketing Digital</option>
              <option value="banco-de-dados">Banco de Dados</option>
              <option value="seguranca-da-informacao">
                Segurança da informação
              </option>
            </select>
          </div>

          <div className="text-xs text-gray-400 font-medium px-2">
            {!loading && `${filteredJobs.length} vagas encontradas`}
          </div>
        </div>

        {/* --- ESTADOS DE LOADING / ERRO --- */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-blue-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-6 text-center text-sm">
            {error}
          </div>
        )}

        {/* --- LISTA DE VAGAS --- */}
        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredJobs.map((job) => (
              <div
                key={job.id_vacancy}
                className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <Typograph
                    tag="title"
                    className="text-blue-primary text-base leading-tight"
                  >
                    {job.title_vacancy}
                  </Typograph>

                  <Typograph className="text-gray-500 text-sm mt-1">
                    {job.area?.name_area}
                  </Typograph>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-[10px] uppercase font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
                      {job.status_vacancy ? "Ativa" : "Encerrada"}
                    </span>
                    <span className="text-[10px] uppercase font-bold bg-gray-50 text-gray-500 px-2 py-1 rounded-md">
                      {new Date(job.start_date_vacancy).toLocaleDateString(
                        "pt-BR",
                      )}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/teacher/vacancie/${job.public_id}`)}
                  className="mt-5 w-full text-xs font-bold bg-blue-primary text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
                >
                  VER DETALHES
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Estado vazio */}
        {!loading && !error && filteredJobs.length === 0 && (
          <div className="bg-white rounded-2xl p-20 text-center border-2 border-dashed border-gray-100">
            <Typograph className="text-gray-400">
              {apiMessage || "Nenhuma vaga corresponde aos seus filtros."}
            </Typograph>
          </div>
        )}
      </main>
    </div>
  );
};
