import { useEffect, useState } from "react"
import { CoursesBarChart } from "../../../components/CoursesBarChart"
import { countCoursesPerTeacher } from "../../../api/services/courses/coursesService"
import { PageContainerTeacher } from "../../../components/PageContainerTeacher"
import { CardDashboardTeacher } from "../../../components/CardDashboardTeacher"

export const DashboardTeacher = () => {
  const [dataCourses, setDataCourses] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDataCourses = async () => {
      try {
        const data = await countCoursesPerTeacher()
        setDataCourses(data)
      } catch (err) {
        setError("Erro ao carregar os dados. Tente novamente.")
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDataCourses()
  }, [])


  if (loading) return <PageContainerTeacher title="Dashboard"><p>Carregando...</p></PageContainerTeacher>
  if (error) return <PageContainerTeacher title="Dashboard"><p>{error}</p></PageContainerTeacher>

  return (
    <PageContainerTeacher title="Dashboard">
      <div className="grid grid-cols-4 gap-4 mb-6">
        <CardDashboardTeacher title="Cursos" value={dataCourses?.total_courses ?? 0} />
        <CardDashboardTeacher title="Aulas" value={dataCourses?.total_lessons ?? 0} />
        <CardDashboardTeacher title="Atividades" value={dataCourses?.total_activities ?? 0} />
        <CardDashboardTeacher title="Alunos" value="120" />
      </div>

      {/* gráfico */}
      {dataCourses?.courses?.length > 0 ? (
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h2 className="text-sm font-medium text-gray-500 mb-4">
            Aulas e atividades por curso
          </h2>
          <CoursesBarChart courses={dataCourses.courses} />
        </div>
      ) : (
        <p className="text-sm text-gray-400">Nenhum curso encontrado.</p>
      )}
    </PageContainerTeacher>
  )
}