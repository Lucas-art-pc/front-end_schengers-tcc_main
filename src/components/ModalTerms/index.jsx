

export const ModalTerms = ({title, openModal, onClose, children}) => {
  
  return (
  openModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white w-11/12 max-w-3xl rounded-xl shadow-xl">

      <div className="flex justify-between items-center border-b p-5">
        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <button
          onClick={() => onClose(false)}
          className="text-2xl"
        >
          ×
        </button>
      </div>

      <div className="p-6 max-h-[70vh] overflow-y-auto">
        {children}
      </div>

      <div className="border-t p-4 flex justify-end">
        <button
          onClick={() => onClose(false)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Fechar
        </button>
      </div>

    </div>
  </div>
)
  )
}