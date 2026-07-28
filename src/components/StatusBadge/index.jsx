export const StatusBadge = ({ active }) => (
  <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
    active ? "bg-teal-50 text-teal-700" : "bg-amber-50 text-amber-700"
  }`}>
    {active ? "Publicado" : "Rascunho"}
  </span>
);
