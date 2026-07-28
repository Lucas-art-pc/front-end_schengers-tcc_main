import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import slide1 from "/assets/images-schengers/images-slide/slide-1.png";
import slide2 from "/assets/images-schengers/images-slide/slide-2.png";
import slide3 from "/assets/images-schengers/images-slide/slide-3.png";

export const Swipper = () => {
  return (
    <>
      {/* ── HERO — apenas mobile/tablet (some no lg) ── */}
      <section className="lg:hidden bg-blue-primary text-white px-6 py-16 flex flex-col items-center text-center gap-6">
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
          Aprenda no seu ritmo,<br /> onde estiver.
        </h1>

        <p className="text-blue-100 text-base sm:text-lg max-w-sm leading-relaxed">
          Acesse cursos técnicos e conteúdos escolares gratuitamente e evolua no
          seu aprendizado.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href="/courses-schengers"
            className="bg-yellow-primary hover:bg-yellow-hover transition text-white font-semibold px-6 py-3 rounded-lg text-sm"
          >
            Ver cursos
          </a>
          <a
            href="/auth/register-student"
            className="border border-white/40 hover:bg-white/10 transition text-white font-medium px-6 py-3 rounded-lg text-sm"
          >
            Criar conta grátis
          </a>
        </div>
      </section>

      {/* ── CARROSSEL — apenas desktop (some abaixo de lg) ── */}
      <div className="hidden lg:block w-full mt-10 px-4 md:px-8 lg:px-16">
        <Swiper
        spaceBetween={16}
        slidesPerView={1}
        centeredSlides={true}
        modules={[Autoplay, Pagination]}
        navigation={true}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        className="w-full rounded-2xl overflow-hidden"
      >
        <SwiperSlide>
          
          <img
            src={slide1}
            alt="slide 1"
            className="w-full h-full object-contain "
          />
        </SwiperSlide>
        <SwiperSlide>
          
          <img
            src={slide2}
            alt="slide 2"
            className="w-full h-full object-contain "
          />
        </SwiperSlide>
        <SwiperSlide>

          <img
            src={slide3}
            alt="slide 3"
            className="w-full h-full object-contain"
          />
        </SwiperSlide>
      </Swiper>
      </div>
    </>
  );
};