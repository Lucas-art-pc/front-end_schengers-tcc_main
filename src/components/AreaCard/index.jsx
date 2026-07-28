import { darken, lighten } from "../../validators/colorsAreaValidator";

export const AreaCard = ({ area }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center gap-3">
        <span
          className="w-3 h-3 rounded-full shrink-0"
          style={{
            backgroundColor: area.color_area,
            boxShadow: `0 0 0 3px ${lighten(area.color_area, 0.7)}`,
          }}
        />
        <span className="font-medium text-gray-900 text-sm leading-tight">
          {area.name_area}
        </span>
      </div>

      <span className="text-xs text-gray-400 font-mono">{area.slug_area}</span>

      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <span className="text-xs text-gray-500">{area.total_courses} {area.total_courses > 1 ? "cursos" : "curso"}</span>
        <span
          className="text-xs font-mono px-2 py-0.5 rounded-md font-medium"
          style={{
            backgroundColor: lighten(area.color_area, 0.88),
            color: darken(area.color_area, 0.55),
          }}
        >
          {area.color_area}
        </span>
      </div>
    </div>
  );
}
