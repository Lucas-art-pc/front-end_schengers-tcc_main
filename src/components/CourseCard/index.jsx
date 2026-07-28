import { LinkVariable } from "../Link";

export const CourseCard = ({ course }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden group cursor-pointer">
    <div className="h-48 overflow-hidden">
      <img
        src={`http://localhost:8000/storage/${course.image}`}
        alt={course.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition"
      />
    </div>

    <div className="p-3">
      <h3 className="text-sm font-semibold text-blue-900 line-clamp-2">
        {course.title}
      </h3>

      <p className="text-xs text-gray-500 my-2 line-clamp-2">
        Duração: {course.duration} h
      </p>

      <LinkVariable type={"primary"} href={`/student/enroll-course/${course.id}`}>
        Acessar
      </LinkVariable>
    </div>
  </div>
);