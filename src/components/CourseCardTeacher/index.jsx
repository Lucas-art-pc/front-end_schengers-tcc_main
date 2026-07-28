import { AreaTag } from "../AreaTag";
import { StatusBadge } from "../StatusBadge";
import { PlayCircle, ClipboardList, Clock } from "lucide-react";

const formatDate = (isoString) => {
  new Date(isoString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export const CourseCardTeacher = ({ course, onView }) => (
  <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200 cursor-default">
    <div className="flex items-start justify-between mb-3">
      <AreaTag area={course.area} />
      <StatusBadge active={course.active_course} />
    </div>

    <h3 className="text-sm font-semibold text-stone-900 leading-snug mb-2 line-clamp-2">
      {course.title_course}
    </h3>

    <p className="text-xs text-stone-400 leading-relaxed mb-4 flex-1 line-clamp-3">
      {course.description_course}
    </p>

    <div className="flex flex-wrap gap-3 mb-3">
      {[
        {
          icon: <PlayCircle size={13} />,
          label: `${course.classes_count} aulas`,
        },
        {
          icon: <ClipboardList size={13} />,
          label: `${course.activities_count} atividades`,
        },
        { icon: <Clock size={13} />, label: `${course.duration_course}h` },
      ].map((s) => (
        <span
          key={s.label}
          className="flex items-center gap-1 text-[11px] text-stone-400"
        >
          <span className="text-stone-300">{s.icon}</span>
          {s.label}
        </span>
      ))}
    </div>

    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
      <span className="text-[11px] text-stone-300 truncate pr-3">
        Atualizado em {formatDate(course.updated_at)}
      </span>
      <button
        onClick={() => onView(course)}
        className="text-xs font-medium text-stone-500 hover:text-blue-600 transition-colors shrink-0"
      >
        Ver curso →
      </button>
    </div>
  </div>
);
