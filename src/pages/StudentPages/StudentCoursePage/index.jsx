import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  PlayCircle,
  FileText,
  CheckCircle,
  AlertCircle,
  Award,
} from "lucide-react";
import { Typograph } from "../../../components/Typograph";
import { getCourseContent } from "../../../api/services/courses/coursesService";

// ─── Sub-componentes ────────────────────────────────────────────

const LessonCard = ({ lesson, courseId, onNavigate }) => {
  const completed = lesson.is_completed;

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg shadow transition-colors ${
        completed
          ? "bg-green-50 border border-green-200"
          : "bg-white hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-3">
        {completed ? (
          <CheckCircle className="text-green-500 shrink-0" />
        ) : (
          <PlayCircle className="text-blue-primary shrink-0" />
        )}
        <div>
          <Typograph className={completed ? "text-gray-400 line-through" : ""}>
            {lesson.title_class}
          </Typograph>
          <Typograph className="text-gray-500 text-sm">
            {lesson.duration_class} min
          </Typograph>
        </div>
      </div>

      <button
        onClick={() =>
          onNavigate(`/student/course/${courseId}/lesson/${lesson.public_id}`)
        }
        className={`text-sm font-medium hover:underline shrink-0 ${
          completed ? "text-green-500" : "text-blue-primary"
        }`}
      >
        {completed ? "Rever" : "Assistir"}
      </button>
    </div>
  );
};

const ActivityCard = ({ activity, courseId, onNavigate }) => {
  const completed = activity.is_completed;

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg shadow transition-colors ${
        completed
          ? "bg-green-50 border border-green-200"
          : "bg-white hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-3">
        {completed ? (
          <CheckCircle className="text-green-500 shrink-0" />
        ) : (
          <FileText className="text-green-600 shrink-0" />
        )}
        <div>
          <Typograph className={completed ? "text-gray-400 line-through" : ""}>
            {activity.title_activity}
          </Typograph>
          <Typograph className="text-gray-500 text-sm">
            {activity.description_activity}
          </Typograph>
        </div>
      </div>

      <button
        onClick={() =>
          onNavigate(
            `/student/course/${courseId}/activity/${activity.public_id}`,
          )
        }
        className={`text-sm font-medium hover:underline shrink-0 ${
          completed ? "text-green-500" : "text-green-600"
        }`}
      >
        {completed ? "Rever" : "Fazer"}
      </button>
    </div>
  );
};

const TabButton = ({ active, color = "blue", onClick, children }) => {
  const activeClass =
    color === "green"
      ? "border-b-2 border-green-600 text-green-600"
      : "border-b-2 border-blue-primary text-blue-primary";

  return (
    <button
      onClick={onClick}
      className={`pb-2 px-4 font-medium transition-colors ${
        active ? activeClass : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
};

// ─── Página principal ────────────────────────────────────────────

export const StudentCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activeTab, setActiveTab] = useState("lessons");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ← estado de erro adicionado

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const data = await getCourseContent(id);
        console.log(data);


        if (!data) {
          setError("Curso não encontrado.");
          return;
        }

        setCourse(data);
        setLessons(data.classes ?? []);
        setActivities(data.activities ?? []);
      } catch (error) {
        console.error(error);
        setError("Erro ao carregar o curso. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleCertificate = () => {
    navigate(`/student/course/certificate/${id}`)
  }
  // ─── Estados de carregamento / erro ──────────────────────────

  if (loading) {
    return (
      <main className="flex-1 p-4 md:p-10">
        <div className="flex flex-col gap-3 animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-5 w-32 bg-gray-100 rounded" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </main>
    );
  }

  if (error || !course) {
    return (
      <main className="flex-1 p-4 md:p-10 flex items-center gap-3 text-red-500">
        <AlertCircle size={20} />
        <span>{error ?? "Curso não encontrado."}</span>
      </main>
    );
  }

  // ─── Contadores para as abas ──────────────────────────────────

  const completedLessons = lessons.filter((l) => l.is_completed).length;
  const completedActivities = activities.filter((a) => a.is_completed).length;

  return (
    <main className="flex-1 p-4 md:p-10">
      <header className="mb-8 flex items-center justify-between gap-4">
        {/* Esquerda */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>

          <Typograph tag="title_large" className="text-blue-primary">
            {course.title_course}
          </Typograph>
        </div>

        {/* Direita */}
        {course.is_completed_course && (
          <button 
          onClick={handleCertificate}
          className="flex items-center gap-2 px-5 py-2.5 bg-yellow-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
            <Award size={18} />
            Emitir Certificado
          </button>
        )}
      </header>

      {/* Abas com contador de progresso */}
      <div className="flex gap-2 mb-6 border-b">
        <TabButton
          active={activeTab === "lessons"}
          onClick={() => setActiveTab("lessons")}
        >
          Aulas
          {lessons.length > 0 && (
            <span className="ml-2 text-xs text-gray-400">
              {completedLessons}/{lessons.length}
            </span>
          )}
        </TabButton>

        <TabButton
          active={activeTab === "activities"}
          color="green"
          onClick={() => setActiveTab("activities")}
        >
          Atividades
          {activities.length > 0 && (
            <span className="ml-2 text-xs text-gray-400">
              {completedActivities}/{activities.length}
            </span>
          )}
        </TabButton>
      </div>

      {/* Aulas */}
      {activeTab === "lessons" && (
        <section className="space-y-3">
          {lessons.length === 0 ? (
            <p className="text-gray-500">Nenhuma aula disponível.</p>
          ) : (
            lessons.map((lesson) => (
              <LessonCard
                key={lesson.public_id}
                lesson={lesson}
                courseId={id}
                onNavigate={navigate}
              />
            ))
          )}
        </section>
      )}

      {/* Atividades */}
      {activeTab === "activities" && (
        <section className="space-y-3">
          {activities.length === 0 ? (
            <p className="text-gray-500">Nenhuma atividade disponível.</p>
          ) : (
            activities.map((activity) => (
              <ActivityCard
                key={activity.public_id}
                activity={activity}
                courseId={id}
                onNavigate={navigate}
              />
            ))
          )}
        </section>
      )}
    </main>
  );
};
