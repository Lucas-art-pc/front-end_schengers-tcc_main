import { useState } from "react";
import { CourseCard } from "../CourseCard";

const MAX_CAROUSEL = 10;

export const CourseCarousel = ({ courses }) => {
  const [index, setIndex] = useState(0);
  const VISIBLE = 4;

  const canPrev = index > 0;
  const canNext = index + VISIBLE < Math.min(courses.length, MAX_CAROUSEL);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(Math.min(courses.length, MAX_CAROUSEL) - VISIBLE, i + 1));

  const visible = courses.slice(0, MAX_CAROUSEL).slice(index, index + VISIBLE);

  return (
    <div className="relative flex items-center gap-2">
      <button
        onClick={prev}
        disabled={!canPrev}
        className={`p-2 rounded-full border transition ${
          canPrev
            ? "bg-white border-blue-300 text-blue-700 hover:bg-blue-50 shadow"
            : "opacity-30 cursor-not-allowed border-gray-200 text-gray-400"
        }`}
        aria-label="Anterior"
      >
        ‹
      </button>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-1">
        {visible.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <button
        onClick={next}
        disabled={!canNext}
        className={`p-2 rounded-full border transition ${
          canNext
            ? "bg-white border-blue-300 text-blue-700 hover:bg-blue-50 shadow"
            : "opacity-30 cursor-not-allowed border-gray-200 text-gray-400"
        }`}
        aria-label="Próximo"
      >
        ›
      </button>
    </div>
  );
};