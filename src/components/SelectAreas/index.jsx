import { useEffect, useState } from "react";
import { listAreas } from "../../api/services/areas/areaService";

export const SelectAreas = ({ value, onChange, error, disabled = false, allOption = false, ...props }) => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listAreas();
        setAreas(response.data ?? response ?? []); 
      } catch (err) {
        console.error("Erro ao buscar áreas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <select
      {...props}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value || null)}  
      disabled={disabled || loading}
      className={`w-full text-sm rounded-xl border px-3.5 py-2.5 outline-none transition-colors focus:border-blue-primary bg-white disabled:opacity-50 ${
        error ? "border-red-300" : "border-gray-200"
      }`}
    >
      {allOption
        ? <option value="">{loading ? "Carregando..." : "Todas as áreas"}</option>
        : <option value="">{loading ? "Carregando..." : "Selecione..."}</option>
      }
      {areas.map((area) => (
        <option key={area.slug_area} value={area.slug_area}>
          {area.name_area}
        </option>
      ))}
    </select>
  );
};