import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { countCoursesPerTeacher } from "../../../api/services/courses/coursesService";
import { CourseCardTeacher } from "../../../components/CourseCardTeacher";



export default function CourseListPage() {
  const [search, setSearch]             = useState("");
  const [filterArea, setFilterArea]     = useState("Todas");
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [courses, setCourses]           = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await countCoursesPerTeacher();
        setCourses(data.courses);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourses();
  }, []);

  const areas = ["Todas", ...Array.from(new Set(courses.map((c) => c.area.name_area)))];

  const filtered = courses.filter((c) => {
    const matchSearch = c.title_course.toLowerCase().includes(search.toLowerCase()) ||
                        c.description_course.toLowerCase().includes(search.toLowerCase());
    const matchArea   = filterArea === "Todas"     || c.area.name_area === filterArea;
    const matchStatus = filterStatus === "Todos"   ||
                        (filterStatus === "published" &&  c.active_course) ||
                        (filterStatus === "draft"     && !c.active_course);
    return matchSearch && matchArea && matchStatus;
  });

  const published = filtered.filter((c) =>  c.active_course).length;
  const draft     = filtered.filter((c) => !c.active_course).length;

  return (
    <div>
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-8">

        {/* PAGE HEADER */}
        <div className="flex items-start justify-between mb-7">
          <div>
            <h1 className="text-2xl font-semibold text-stone-900 mb-1">Meus Cursos</h1>
            <p className="text-sm text-stone-400">Gerencie todo o conteúdo dos seus cursos em um só lugar.</p>
          </div>
          <button
            onClick={() => navigate("/teacherAuth/course/form")}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            + Criar novo curso
          </button>
        </div>

        {/* FILTERS */}
        <div className="bg-white border border-stone-200 rounded-xl px-4 py-3 mb-5 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300 text-sm pointer-events-none">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título ou descrição..."
              className="w-full pl-8 pr-3 py-2 border border-stone-200 rounded-lg bg-stone-50 text-stone-800 text-sm placeholder-stone-300 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          <select
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="px-3 py-2 border border-stone-200 rounded-lg bg-stone-50 text-stone-700 text-sm focus:outline-none focus:border-blue-400 transition-colors"
          >
            {areas.map((a) => <option key={a}>{a}</option>)}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-stone-200 rounded-lg bg-stone-50 text-stone-700 text-sm focus:outline-none focus:border-blue-400 transition-colors"
          >
            <option value="Todos">Todos os status</option>
            <option value="published">Publicado</option>
            <option value="draft">Rascunho</option>
          </select>
        </div>

        {/* RESULT COUNT */}
        <div className="text-xs text-stone-400 mb-4 flex flex-wrap gap-1 items-center">
          <span>
            {filtered.length} curso{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
            {(search || filterArea !== "Todas" || filterStatus !== "Todos") && " com os filtros aplicados"}
          </span>
          {filtered.length > 0 && (
            <>
              <span>·</span>
              <span className="text-teal-600">{published} publicado{published !== 1 ? "s" : ""}</span>
              <span>·</span>
              <span className="text-amber-500">{draft} rascunho{draft !== 1 ? "s" : ""}</span>
            </>
          )}
        </div>

        {/* CONTENT */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl py-16 text-center">
            <div className="text-4xl mb-3">📭</div>
            <div className="text-base font-semibold text-stone-800 mb-1">Nenhum curso encontrado</div>
            <div className="text-sm text-stone-400">Tente ajustar os filtros ou criar um novo curso.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <CourseCardTeacher
                key={c.id_course}
                course={c}
                onView={(course) => navigate(`/teacherAuth/course/${course.public_id}/form`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}