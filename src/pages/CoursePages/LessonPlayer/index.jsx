import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Typograph } from "../../../components/Typograph";
import { useEffect, useState } from "react";
import {
  getWatchedLesson,
  showLesson,
  watchedLesson,
} from "../../../api/services/courses/lessons/lessonsService";

export const LessonPlayer = () => {
  const { id, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [isWatched, setIsWatched] = useState(false);

  const navigate = useNavigate();

  const watched = async () => {
    try {
      const data = await watchedLesson(lessonId);
      setIsWatched(data);
    } catch (error) {
      console.error("Erro ao marcar aula:", error);
    }
  };

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await showLesson(id, lessonId);
        const verifyWatched = await getWatchedLesson(lessonId);
        setIsWatched(verifyWatched);
        setLesson(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLesson();
  }, [id, lessonId]);

  if (!lesson) {
    return <div className="p-10">Aula não encontrada.</div>;
  }

  return (
    <main className="flex-1 p-4 md:p-10">
      {/* Header */}
      <header className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <Typograph tag="title_large" className="text-blue-primary">
          {lesson.title_class}
        </Typograph>
      </header>

      {/* Vídeo */}
      <div className="flex items-center justify-center w-full md:w-[80%] mx-auto aspect-video mb-6">
        <iframe
          width="1240"
          height="720"
          src={lesson.url_class}
          title={lesson.title_class}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      {/* Descrição */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <Typograph tag="title">Sobre a aula</Typograph>

        <Typograph className="text-gray-600">
          {lesson.description_class}
        </Typograph>
        <Typograph className="text-gray-600">
          {lesson.explication_class}
        </Typograph>
      </div>

      {/* Ações futuras */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={watched}
          disabled={isWatched}
          className={`px-6 py-2 rounded-lg text-white transition
      ${
        isWatched
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
      }
    `}
        >
          {isWatched ? "Assistida" : "Marcar como assistida"}
        </button>

        <button
          onClick={() => navigate(`/student/course/${id}`)}
          className="px-6 py-2 bg-gray-200 rounded-lg"
        >
          Voltar ao curso
        </button>
      </div>
    </main>
  );
};
