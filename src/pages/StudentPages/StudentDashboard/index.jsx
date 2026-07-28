import { useEffect, useMemo, useState } from "react";
import { Typograph } from "../../../components/Typograph";
import { CourseCard } from "../../../components/CourseCard";
import { FilterButton } from "../../../components/FilterButton";
import { indexCourses } from "../../../api/services/courses/coursesService";
import { dataUser } from "../../../api/services/auth/dataUser";
import { CourseCarousel } from "../../../components/CourseCarousel";
import { SelectAreas } from "../../../components/SelectAreas";

const MAX_CAROUSEL = 4;

// ─── Skeleton do CourseCard ───────────────────────────────────────────────────
const CourseCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="h-28 bg-gray-200 animate-pulse" />

    <div className="p-3 space-y-2">
      <div className="h-3.5 bg-gray-200 animate-pulse rounded w-4/5" />
      <div className="h-3.5 bg-gray-200 animate-pulse rounded w-3/5" />

      <div className="h-3 bg-gray-100 animate-pulse rounded w-full mt-1" />
      <div className="h-3 bg-gray-100 animate-pulse rounded w-2/3" />

      <div className="h-7 bg-gray-200 animate-pulse rounded-md w-20 mt-2" />
    </div>
  </div>
);

// ─── Skeleton dos filtros ─────────────────────────────────────────────────────
const FiltersSkeleton = () => (
  <div className="flex flex-wrap gap-2 mb-6">
    {[80, 100, 90, 110, 85].map((w, i) => (
      <div
        key={i}
        className="h-8 bg-gray-200 animate-pulse rounded-full"
        style={{ width: w }}
      />
    ))}
  </div>
);

// ─── Skeleton de uma seção ────────────────────────────────────────────────────
const SectionSkeleton = () => (
  <div className="mb-10">
    <div className="h-5 bg-gray-200 animate-pulse rounded w-40 mb-4" />

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

// ─── Skeleton do nome ─────────────────────────────────────────────────────────
const UsernameSkeleton = () => (
  <div className="h-7 bg-gray-200 animate-pulse rounded w-40 inline-block" />
);

// ─── Componente principal ─────────────────────────────────────────────────────
export const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  // busca separada, não depende dos cursos

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);

  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // ─── Debounce da busca ─────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);

    return () => clearTimeout(timer);
  }, [search]);

  // ─── Buscar usuário ────────────────────────────────────────────────────────
  useEffect(() => {
    dataUser()
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoadingUser(false));
  }, []);

  // ─── Buscar cursos ─────────────────────────────────────────────────────────
  useEffect(() => {
    const params = {
      per_page: 100,
      ...(debouncedSearch && { search: debouncedSearch }),
      ...(selectedArea && { area_slug: selectedArea }), // alinha com o backend
    };
    // ativa loading a cada nova busca
    console.log("selectedArea:", selectedArea); // adiciona temporariamente
    indexCourses(params)
      .then((data) => setCourses(data.data ?? []))
      .catch(console.error)
      .finally(() => setLoadingCourses(false));
  }, [debouncedSearch, selectedArea]);

  const isFiltering = debouncedSearch !== "" || selectedArea !== null;

  // ─── Agrupar cursos por área ───────────────────────────────────────────────
  const sections = useMemo(() => {
    const grouped = courses.reduce((acc, course) => {
      const key = course.area?.name || "Outros";
      if (!acc[key]) acc[key] = [];
      acc[key].push(course);
      return acc;
    }, {});

    return Object.entries(grouped).map(([area, courses]) => ({
      area,
      courses,
    }));
  }, [courses]);

  return (
    <main className="flex-1 p-8">
      {/* Saudação */}
      <Typograph tag="title_large" className="mb-6 text-blue-primary">
        Bem-vindo,{" "}
        <span className="text-yellow-primary">
          {loadingUser ? <UsernameSkeleton /> : user?.name}
        </span>
      </Typograph>

      {/* Busca */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Buscar cursos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <div className="w-full md:w-1/4">
          <SelectAreas
            value={selectedArea}
            onChange={setSelectedArea}
            allOption
          />
        </div>
      </div>

      {/* Conteúdo */}
      {loadingCourses ? (
        <>
          <SectionSkeleton />
        </>
      ) : (
        <>
          {sections.length === 0 && (
            <p className="text-gray-400 text-center mt-10">
              Nenhum curso está disponível no momento.
            </p>
          )}

          {sections.map((section) => {
            if (section.courses.length === 0) {
              return null;
            }

            return (
              <div key={section.area} className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-blue-700">
                    {section.area}
                  </h2>

                  {!isFiltering && section.courses.length > MAX_CAROUSEL && (
                    <span className="text-sm text-gray-400">
                      Mostrando {MAX_CAROUSEL} de {section.courses.length}{" "}
                      cursos
                    </span>
                  )}
                </div>

                {isFiltering ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {section.courses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <CourseCarousel courses={section.courses} />
                )}
              </div>
            );
          })}
        </>
      )}
    </main>
  );
};
