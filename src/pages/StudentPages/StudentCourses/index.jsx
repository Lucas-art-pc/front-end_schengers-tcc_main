import { useEffect, useState } from "react";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { Typograph } from "../../../components/Typograph";
import { coursesPerStudent } from "../../../api/services/courses/coursesService";
import { LinkVariable } from "../../../components/Link";

export const StudentCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await coursesPerStudent();
        setCourses(data.courses);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="space-y-6">
      <Typograph tag="title_large" className="text-blue-primary">
        Meus Cursos
      </Typograph>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
          <BookOpen size={32} className="text-gray-300 mb-2" />
          <p className="text-gray-400 text-sm font-medium">
            Você ainda não está matriculado em nenhum curso
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id_course}
              className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              {/* Faixa de cor no topo */}
              <div className="h-1.5 bg-linear-to-r from-blue-500 to-blue-400 w-full" />

              <div className="flex flex-col flex-1 p-5 gap-3">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="shrink-0 bg-blue-50 text-blue-600 p-2 rounded-lg mt-0.5">
                    <BookOpen size={18} />
                  </div>
                  <h2 className="font-semibold text-gray-800 leading-snug line-clamp-2">
                    {course.title_course}
                  </h2>
                </div>

                {/* Descrição — ocupa o espaço disponível e corta com ellipsis */}
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
                  {course.description_course}
                </p>

                {/* Duração */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock size={13} />
                  <span>{course.duration_course}h de duração</span>
                </div>

                {/* Botão — sempre fica no rodapé */}
                <div className="pt-1 mt-auto">
                  <LinkVariable
                    type="primary"
                    href={`/student/enroll-course/${course.public_id}`}
                    className="flex items-center justify-center gap-2 w-full"
                  >
                    Acessar curso
                  </LinkVariable>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};