import { Swipper as Carrousel } from "../../../components/Swipper";
import { Typograph } from "../../../components/Typograph";
      import {
  CalendarClock,
  LineChart,
  ListChecks,
  Users,
  ClipboardList,
  Award,
  GraduationCap,
  BookOpen,
} from "lucide-react";

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
      <Typograph
        tag="title_large"
        className="text-yellow-primary [text-shadow:1px_1px_2px_rgba(0,0,0,0.3)]"
      >
        Crie e organize sua rotina de estudos
      </Typograph>
    </div>

    <Typograph
      tag="paragraph"
      className="mt-4 sm:mt-6 text-gray-600 text-center max-w-2xl mx-auto text-base sm:text-lg"
    >
      Estruture seu aprendizado com rotinas personalizadas, acompanhe seu
      progresso e mantenha consistência nos estudos dentro da plataforma.
    </Typograph>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-10 sm:mt-12 lg:mt-16">

      {/* Coluna Aluno */}
      <div className="relative p-6 sm:p-8 lg:p-10 rounded-3xl border border-gray-200 bg-linear-to-br from-yellow-50 to-white hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">

        <div className="absolute -top-8 -right-8 w-32 h-32 bg-yellow-primary/10 rounded-full blur-2xl" />

        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-yellow-primary/15 text-yellow-primary">
            <GraduationCap size={26} />
          </div>
          <Typograph tag="subtitle" className="text-yellow-primary text-2xl sm:text-3xl">
            Para o aluno
          </Typograph>
        </div>

        <div className="mt-6 flex flex-col gap-5">
          <div className="flex gap-3">
            <CalendarClock className="shrink-0 mt-1 text-yellow-primary" size={22} />
            <div>
              <Typograph tag="title_small" className="text-lg sm:text-xl">
                Planejamento de estudos
              </Typograph>
              <Typograph tag="paragraph" className="mt-1 text-gray-600 text-base">
                Organize seus horários e defina quais conteúdos serão estudados
                em cada período.
              </Typograph>
            </div>
          </div>

          <div className="flex gap-3">
            <LineChart className="shrink-0 mt-1 text-yellow-primary" size={22} />
            <div>
              <Typograph tag="title_small" className="text-lg sm:text-xl">
                Acompanhamento de progresso
              </Typograph>
              <Typograph tag="paragraph" className="mt-1 text-gray-600 text-base">
                Visualize seu desempenho nas atividades e acompanhe sua evolução
                ao longo dos cursos.
              </Typograph>
            </div>
          </div>

          <div className="flex gap-3">
            <ListChecks className="shrink-0 mt-1 text-yellow-primary" size={22} />
            <div>
              <Typograph tag="title_small" className="text-lg sm:text-xl">
                Rotinas personalizadas
              </Typograph>
              <Typograph tag="paragraph" className="mt-1 text-gray-600 text-base">
                Crie rotinas adaptadas aos seus objetivos de estudo e mantenha
                uma organização eficiente no dia a dia.
              </Typograph>
            </div>
          </div>

          <div className="flex gap-3">
            <Award className="shrink-0 mt-1 text-yellow-primary" size={22} />
            <div>
              <Typograph tag="title_small" className="text-lg sm:text-xl">
                Certificados de conclusão
              </Typograph>
              <Typograph tag="paragraph" className="mt-1 text-gray-600 text-base">
                Receba certificados automaticamente ao concluir cursos e
                acompanhe seu histórico de conquistas.
              </Typograph>
            </div>
          </div>
        </div>
      </div>

      {/* Coluna Professor */}
      <div className="relative p-6 sm:p-8 lg:p-10 rounded-3xl border border-gray-200 bg-linear-to-br from-blue-50 to-white hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">

        <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-900/10 rounded-full blur-2xl" />

        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-900/10 text-blue-900">
            <Users size={26} />
          </div>
          <Typograph tag="subtitle" className="text-blue-primary text-2xl sm:text-3xl">
            Para o professor
          </Typograph>
        </div>

        <div className="mt-6 flex flex-col gap-5">
          <div className="flex gap-3">
            <BookOpen className="shrink-0 mt-1 text-blue-900" size={22} />
            <div>
              <Typograph tag="title_small" className="text-lg sm:text-xl">
                Gestão de turmas e cursos
              </Typograph>
              <Typograph tag="paragraph" className="mt-1 text-gray-600 text-base">
                Crie e organize cursos, defina conteúdos e acompanhe a
                participação dos alunos.
              </Typograph>
            </div>
          </div>

          <div className="flex gap-3">
            <ClipboardList className="shrink-0 mt-1 text-blue-900" size={22} />
            <div>
              <Typograph tag="title_small" className="text-lg sm:text-xl">
                Envio de tarefas e avisos
              </Typograph>
              <Typograph tag="paragraph" className="mt-1 text-gray-600 text-base">
                Comunique-se com os alunos enviando tarefas, notificações e
                materiais complementares.
              </Typograph>
            </div>
          </div>

          <div className="flex gap-3">
            <LineChart className="shrink-0 mt-1 text-blue-900" size={22} />
            <div>
              <Typograph tag="title_small" className="text-lg sm:text-xl">
                Acompanhamento de desempenho
              </Typograph>
              <Typograph tag="paragraph" className="mt-1 text-gray-600 text-base">
                Visualize o progresso dos alunos e identifique pontos de
                atenção ao longo do curso.
              </Typograph>
            </div>
          </div>

          <div className="flex gap-3">
            <Users className="shrink-0 mt-1 text-blue-900" size={22} />
            <div>
              <Typograph tag="title_small" className="text-lg sm:text-xl">
                Central de suporte
              </Typograph>
              <Typograph tag="paragraph" className="mt-1 text-gray-600 text-base">
                Responda dúvidas dos alunos e gerencie chamados de suporte
                diretamente pela plataforma.
              </Typograph>
            </div>
          </div>
        </div>
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
                <Typograph
                  tag="paragraph"
                  className="mt-3 sm:mt-4 text-gray-600"
                >
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
                <Typograph
                  tag="paragraph"
                  className="mt-3 sm:mt-4 text-gray-600"
                >
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
