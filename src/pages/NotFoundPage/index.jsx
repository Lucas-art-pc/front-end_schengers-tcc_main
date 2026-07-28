import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 py-12 font-sans">

      <span className="bg-blue-100 text-blue-800 text-xs font-medium tracking-widest uppercase px-4 py-1 rounded-full mb-8">
        Página não encontrada
      </span>

      <div className="flex items-center mb-8">
        <span className="text-9xl font-semibold leading-none text-blue-800">4</span>

        <div className="relative w-24 h-24 flex items-center justify-center mx-1">
          <div className="w-24 h-24 rounded-full bg-blue-800 relative">
            <div className="absolute w-36 h-7 border-4 border-yellow-400 rounded-full -rotate-12 top-8 -left-6" />
            <div className="absolute w-5 h-5 bg-yellow-400 rounded-full top-2 right-1" />
            <div className="absolute w-8 h-8 bg-blue-200 rounded-full opacity-40 top-4 left-4" />
          </div>
        </div>

        <span className="text-9xl font-semibold leading-none text-blue-800">4</span>
      </div>

      <h1 className="text-2xl font-medium text-gray-900 mb-3 text-center">
        Ops! Essa página se perdeu no espaço.
      </h1>
      <p className="text-base text-gray-500 leading-relaxed text-center max-w-sm mb-8">
        A página que você está procurando não existe, foi removida ou o endereço está incorreto.
      </p>

      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          Voltar ao início
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-white hover:bg-gray-50 text-gray-700 text-sm border border-gray-200 px-6 py-2.5 rounded-lg transition-colors"
        >
          Página anterior
        </button>
      </div>

    </div>
  )
}