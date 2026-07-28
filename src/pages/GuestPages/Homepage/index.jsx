import { Swipper as Carrousel } from "../../../components/Swipper";
import { Typograph } from "../../../components/Typograph";

import studante from "/assets/images-schengers/image-section.jpg";
import divulga_courses from "/assets/images-schengers/divulga-cursos.png";

export const HomePage = () => {
  return (
    <>
      <Carrousel />

      {/* ── Seção: Rotina de estudos ── */}
      <section className="my-12 sm:my-16 md:my-20 lg:my-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="flex justify-center items-center text-center px-2">
            <Typograph tag="title_large" className="text-yellow-primary">
              Crie e organize sua rotina de estudos
            </Typograph>
          </div>

          <Typograph
            tag="paragraph"
            className="mt-4 sm:mt-6 text-gray-600 text-center max-w-2xl mx-auto"
          >
            Estruture seu aprendizado com rotinas personalizadas, acompanhe seu
            progresso e mantenha consistência nos estudos dentro da plataforma.
          </Typograph>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-10 sm:mt-12 lg:mt-16">
            <div className="p-5 sm:p-6 lg:p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition">
              <Typograph tag="title_small">Planejamento de estudos</Typograph>
              <Typograph tag="paragraph" className="mt-3 sm:mt-4 text-gray-600">
                Organize seus horários e defina quais conteúdos serão estudados
                em cada período.
              </Typograph>
            </div>

            <div className="p-5 sm:p-6 lg:p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition">
              <Typograph tag="title_small">
                Acompanhamento de progresso
              </Typograph>
              <Typograph tag="paragraph" className="mt-3 sm:mt-4 text-gray-600">
                Visualize seu desempenho nas atividades e acompanhe sua evolução
                ao longo dos cursos.
              </Typograph>
            </div>

            <div className="p-5 sm:p-6 lg:p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition sm:col-span-2 md:col-span-1">
              <Typograph tag="title_small">Rotinas personalizadas</Typograph>
              <Typograph tag="paragraph" className="mt-3 sm:mt-4 text-gray-600">
                Crie rotinas adaptadas aos seus objetivos de estudo e mantenha
                uma organização eficiente no dia a dia.
              </Typograph>
            </div>
          </div>

        </div>
      </section>

      {/* ── Seção: Banner de cursos ── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">

          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-snug">
              Aprenda novas habilidades gratuitamente
            </h1>

            <p className="text-base sm:text-lg text-blue-100 mb-5 sm:mb-6">
              Explore cursos técnicos e educacionais criados para ajudar
              estudantes a desenvolver conhecimento e oportunidades.
            </p>

            <a
              href="/courses-schengers"
              className="inline-block bg-yellow-primary hover:bg-yellow-hover transition text-white px-5 sm:px-6 py-3 rounded-lg font-semibold text-sm sm:text-base"
            >
              Conheça nossos cursos
            </a>
          </div>

          <div className="flex justify-center">
            <img
              src={divulga_courses}
              alt="Divulgação de cursos"
              className="rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* ── Seção: Conteúdos escolares e técnicos ── */}
      <section className="my-16 sm:my-24 lg:my-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14 lg:mb-20 text-center">
          <Typograph
            tag="title_large"
            className="text-blue-primary text-center"
          >
            Cursos técnicos e conteúdos escolares em um único lugar
          </Typograph>

          <Typograph tag="paragraph" className="mt-4 sm:mt-6 text-gray-600">
            A plataforma reúne conteúdos voltados para o desenvolvimento
            acadêmico e técnico, permitindo que estudantes fortaleçam
            conhecimentos escolares e adquiram novas habilidades importantes
            para o mercado.
          </Typograph>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="p-5 sm:p-6 lg:p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition">
                <Typograph tag="title_small">Conteúdos escolares</Typograph>
                <Typograph tag="paragraph" className="mt-3 sm:mt-4 text-gray-600">
                  Materiais voltados para disciplinas do ensino fundamental e
                  médio, auxiliando na revisão de conteúdos e na preparação para
                  avaliações.
                </Typograph>
                <ul className="mt-3 sm:mt-4 text-sm text-gray-500 space-y-1">
                  <li>Matemática</li>
                  <li>Português</li>
                  <li>História</li>
                  <li>Geografia</li>
                </ul>
              </div>

              <div className="p-5 sm:p-6 lg:p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition">
                <Typograph tag="title_small">Cursos técnicos</Typograph>
                <Typograph tag="paragraph" className="mt-3 sm:mt-4 text-gray-600">
                  Conteúdos estruturados para o desenvolvimento de habilidades
                  práticas em áreas de tecnologia e ferramentas digitais.
                </Typograph>
                <ul className="mt-3 sm:mt-4 text-sm text-gray-500 space-y-1">
                  <li>Programação</li>
                  <li>Tecnologia da Informação</li>
                  <li>Ferramentas digitais</li>
                  <li>Fundamentos de sistemas</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center order-first lg:order-last">
              <img
                src={studante}
                alt="Cursos da plataforma"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain rounded-xl"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
};