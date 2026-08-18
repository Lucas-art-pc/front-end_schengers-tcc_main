import { CoursesCarousel } from "../../../components/CoursesCarrousel";
import { LinkVariable } from "../../../components/Link";
import { Typograph } from "../../../components/Typograph";
import { BookOpen, Award, Zap, ArrowRight } from "lucide-react";

import knowledge_courses from "/assets/images-schengers/mulher-formatada.png";

export const CoursesMarketing = () => {
  return (
    <div className="bg-white ">
      {/* HERO */}
      <section className="bg-blue-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Aprenda novas habilidades e transforme seu futuro
            </h1>

            <p className="mt-6 text-lg text-blue-100">
              Nossa plataforma oferece cursos técnicos e educacionais gratuitos
              para ajudar estudantes a desenvolver conhecimento e oportunidades
              profissionais.
            </p>

            <div className="mt-8 flex gap-4">
              <LinkVariable href={"/"} type={"primary"}>
                Começar agora
              </LinkVariable>

              <a
                href="#courses"
                className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition"
              >
                Ver cursos
              </a>
            </div>
          </div>

          <div>
            <img src={knowledge_courses} alt="Estudando" />
          </div>
        </div>
      </section>

      {/* CURSOS */}
      <CoursesCarousel />

      {/* BENEFÍCIOS */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
  
          <Typograph tag="title_large" className="text-3xl font-bold mb-4">
            Por que estudar conosco?
          </Typograph>
          <Typograph
            tag="paragraph"
            className="text-gray-500 max-w-2xl mx-auto mb-12"
          >
            Tudo o que você precisa para aprender de verdade, sem barreiras.
          </Typograph>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
                <BookOpen className="w-6 h-6 text-[#1E40AF]" />
              </div>
              <Typograph tag="subtitle" className="mb-2">
                Conteúdo gratuito
              </Typograph>
              <Typograph tag="paragraph" className="text-gray-600">
                Acesso livre a cursos educacionais e técnicos sem custos.
              </Typograph>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left">
              <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center mb-5">
                <Award className="w-6 h-6 text-shadow-yellow-primary" />
              </div>
              <Typograph tag="subtitle" className="mb-2">
                Certificação reconhecida
              </Typograph>
              <Typograph tag="paragraph" className="text-gray-600">
                Receba certificados ao concluir os cursos e comprove seu
                aprendizado.
              </Typograph>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
                <Zap className="w-6 h-6 text-[#1E40AF]" />
              </div>
              <Typograph tag="subtitle" className="mb-2">
                Plataforma moderna
              </Typograph>
              <Typograph tag="paragraph" className="text-gray-600">
                Uma experiência rápida, intuitiva e pensada para o seu ritmo de
                estudo.
              </Typograph>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#1E40AF] to-[#0B2373] py-24 text-center text-white">
        {/* elementos decorativos */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-yellow-primary/10 rounded-full blur-3xl" />

        <div className="relative max-w-2xl mx-auto px-6">
          <Typograph
            tag="title"
            className="mb-4 text-3xl md:text-4xl font-bold"
          >
            Comece sua jornada de aprendizado
          </Typograph>

          <p className="text-blue-100 mb-8 text-lg">
            Crie sua conta gratuitamente e tenha acesso aos cursos.
          </p>

          <a
            href="/auth/register-student"
            className="inline-flex items-center gap-2 bg-yellow-primary text-blue-primary px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Criar conta gratuita
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};
