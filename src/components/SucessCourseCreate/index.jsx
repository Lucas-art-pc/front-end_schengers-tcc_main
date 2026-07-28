import { useNavigate } from "react-router-dom";

export const SucessCourseCreate = ({isEditing, form, handleReset}) => {
  const navigate  = useNavigate();
  return( 
     <div className="flex items-center justify-center h-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-sm w-full text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {isEditing ? "Curso atualizado!" : "Curso criado!"}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                <strong className="text-gray-800">{form.title_course}</strong> foi{" "}
                {isEditing ? "atualizado" : "cadastrado"} com sucesso.
              </p>
              <div className="flex flex-col gap-2">
                {!isEditing && (
                  <button
                    onClick={handleReset}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
                  >
                    Criar outro curso
                  </button>
                )}
                <button
                  onClick={() => navigate("/teacherAuth/courses")}
                  className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
                >
                  Ver meus cursos
                </button>
              </div>
            </div>
          </div>
  )
}