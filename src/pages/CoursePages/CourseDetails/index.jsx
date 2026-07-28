import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typograph } from "../../../components/Typograph";
import { checkEnrollment, enrollCourse, showCourse } from "../../../api/services/courses/coursesService";
import { ArrowLeft } from "lucide-react";

export const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState(false);
  const [course, setCourse] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await showCourse(id); 
        const enroll = await checkEnrollment(id);
        setEnrolled(enroll)
        setCourse(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();


  }, [id]); 

  if (loading) {
    return <div className="p-10">Carregando...</div>;
  }

  if (!course) {
    return <div className="p-10">Curso não encontrado.</div>;
  }

  if (course.active_course == false) {
    return <div className="p-10">Curso indisponível</div>
    ;
  }



  const handleEnroll = async () => {
  try {
    await enrollCourse(id);
    navigate(`/student/course/${course.id}`);
  } catch (err) {
    console.error("Erro ao se matricular:", err);
  
  }
};

  return (
<main className="flex-1 w-full">
  {/* HEADER */}
  <section className="bg-blue-primary text-white p-6 md:p-10">
    <div className="flex items-center gap-4 mb-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg"
      >
        <ArrowLeft size={18} />
        Voltar
      </button>
    </div>

    <div className="max-w-6xl">
      <Typograph tag="title_large" className="text-white">
        {course.title}
      </Typograph>

      <Typograph className="text-white/80 mt-3 max-w-3xl">
        {course.description}
      </Typograph>
    </div>
  </section>


  <section className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

    <div className="lg:col-span-2 space-y-6">

      {/* Informações */}
      <div className="bg-white p-6 rounded-xl shadow">
        <Typograph tag="title" className="mb-4">
          Informações do Curso
        </Typograph>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Info label="Professor" value={course.teacher?.name ?? "Não informado"} />
          <Info label="Carga Horária" value={course.duration ? `${course.duration}h` : "Não informado"} />
          <Info label="Área" value={course.area?.name ?? "Não informado"} />
          <Info label="Status" value={course.active_course ? "Ativo" : "Inativo"} />
        </div>
      </div>


      <div className="bg-white p-6 rounded-xl shadow">
        <Typograph tag="title" className="mb-4">
          Sobre o curso
        </Typograph>

        <Typograph className="text-gray-600 leading-relaxed">
          {course.description}
        </Typograph>
      </div>
    </div>

    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow sticky top-6">
        <Typograph tag="title" className="mb-4">
          Acesso ao curso
        </Typograph>

        {!enrolled ? (
          <button
            onClick={handleEnroll}
            className="w-full px-6 py-3 bg-yellow-primary text-white rounded-lg hover:opacity-90 transition"
          >
            Matricular-se
          </button>
        ) : (
          <button
            onClick={() => navigate(`/student/course/${course.id}`)}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg"
          >
            Acessar curso
          </button>
        )}

        <div className="mt-4 text-sm text-gray-500">
          ✔ Acesso imediato
          <br />
          ✔ Conteúdo completo
          <br />✔ Certificado ao concluir
        </div>
      </div>
    </div>
  </section>
</main>
  )
}

const Info = ({ label, value }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <Typograph className="text-gray-500 text-sm">{label}</Typograph>
      <Typograph className="font-medium">{value}</Typograph>
    </div>
  );
};
