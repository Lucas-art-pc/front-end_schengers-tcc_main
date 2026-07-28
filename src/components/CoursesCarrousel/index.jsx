import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Typograph } from "../Typograph";

export const CoursesCarousel = () => {

  const courses = [
    {
      id: 1,
      name: "Ortografia e acentuação",
      description: "Aprenda conceitos básicos de computadores e ferramentas digitais.",
      category: "Curso escolar",
      image: "assets/images-schengers/images-courses-marketing/Port-3.png"
    },
    {
      id: 2,
      name: "Equações",
      description: "Fundamentos de matemática para estudos escolares.",
      category: "Curso escolar",
      image: "assets/images-schengers/images-courses-marketing/Mat-2.png"
    },
    {
      id: 3,
      name: "Matemática básica",
      description: "Aprenda lógica de programação e resolução de problemas.",
      category: "Curso escolar",
      image: "assets/images-schengers/images-courses-marketing/Mat-1.png"
    },
    {
      id: 4,
      name: "HTML & CSS",
      description: "Melhore sua escrita e interpretação de textos.",
      category: "Curso técnico",
      image: "assets/images-schengers/images-courses-marketing/Prog-1.png"
    },
    {
      id: 5,
      name: "Interpretação de texto",
      description: "Aprenda como a internet funciona e suas ferramentas.",
      category: "Curso escolar",
      image: "assets/images-schengers/images-courses-marketing/Port-1.png"
    },
    {
      id: 6,
      name: "Lógica de programação",
      description: "Desenvolva habilidades de pensamento lógico.",
      category: "Curso escolar",
      image: "assets/images-schengers/images-courses-marketing/Prog-2.png"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-350 mx-auto px-6">

        <Typograph tag="title_large" className="text-4xl font-bold text-center mb-16">
          Cursos em <span className="text-yellow-primary">destaque</span>
        </Typograph>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={40}
          slidesPerView={4}
          navigation
          autoplay={{ delay: 4500 }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
        >

          {courses.map((course) => (
            <SwiperSlide key={course.id}>

              <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300 h-90 flex flex-col">

                <div className="h-42.5 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-5 flex flex-col grow">

                  <h3 className="text-lg font-semibold mb-2">
                    {course.name}
                  </h3>

                  <p className="text-gray-600 text-sm grow">
                    {course.description}
                  </p>

                  <span className="text-xs font-medium text-blue-600 mt-3">
                    {course.category}
                  </span>

                </div>

              </div>

            </SwiperSlide>
          ))}

        </Swiper>

      </div>

    </section>
  );
};