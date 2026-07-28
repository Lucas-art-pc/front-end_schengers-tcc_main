import { useEffect, useState } from "react";
import { AreaModal } from "../../../components/AreaModal";
import { AreaCard } from "../../../components/AreaCard";
import { createAreas, listAreas } from "../../../api/services/areas/areaService";


function EmptyState({ onNew }) {
  return (
    <div className="col-span-full flex flex-col items-center gap-3 py-20 text-gray-400">
      <svg
        className="w-10 h-10 text-gray-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        />
      </svg>
      <p className="text-sm">Nenhuma área cadastrada ainda.</p>
      <button
        onClick={onNew}
        className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
      >
        Criar a primeira área →
      </button>
    </div>
  );
}


function Toast({ message, visible }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <svg
        className="w-4 h-4 text-green-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 13l4 4L19 7"
        />
      </svg>
      {message}
    </div>
  );
}

export const ListAreas = () => {
  const [areas, setAreas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });
  



const handleCreate = async (payload) => {
  
  const nova = await createAreas(payload);
  setAreas((prev) => [...prev, nova.data]);
  showToast("Área criada com sucesso!");
};

  useEffect(() => {
    const fetchData = async () => {
      const response = await listAreas();
      console.log(response)
      setAreas(response);
    };

    fetchData();
  }, []);

  function showToast(msg) {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2800);
  }

  

  return (
    // Fills the flex-1 <main> from AdminLayout — no extra min-h-screen needed
    <div className="w-full">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            Áreas de cursos
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {areas.length === 1
              ? "1 área cadastrada"
              : `${areas.length} áreas cadastradas`}
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 active:scale-95 transition-all"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nova área
        </button>
      </div>

      {/* Areas grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {areas.length === 0 ? (
          <EmptyState onNew={() => setModalOpen(true)} />
        ) : (
          areas.map((area) => <AreaCard key={area.slug_area} area={area} />)
        )}
      </div>

      <AreaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
};
