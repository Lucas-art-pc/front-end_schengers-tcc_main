import { CoursesCarousel } from "../../../components/CoursesCarrousel";
import { LinkVariable } from "../../../components/Link";
import { Typograph } from "../../../components/Typograph";

import knowledge_courses from "/assets/images-schengers/aprendizagem-plataforma.png";


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
                Nossa plataforma oferece cursos técnicos e educacionais
                gratuitos para ajudar estudantes a desenvolver conhecimento e
                oportunidades profissionais.
              </p>

              <div className="mt-8 flex gap-4">
                <LinkVariable href={"/"} type={"primary"} 
                >
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
              <img
                src={knowledge_courses}
                alt="Estudando"
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* CURSOS */}
        <CoursesCarousel />

        {/* BENEFÍCIOS */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <Typograph tag="title_large" className="text-3xl font-bold mb-12">
              Por que estudar conosco?
            </Typograph>

            <div className="grid md:grid-cols-3 gap-10">
              <div>
                <Typograph tag="subtitle">
                  Conteúdo gratuito
                </Typograph>
                <Typograph tag="paragraph" className="text-gray-600">
                  Acesso livre a cursos educacionais e técnicos sem custos.
                </Typograph>
              </div>

              <div>
                <Typograph tag="subtitle">
                  Conteúdo gratuito
                </Typograph>
                <Typograph tag="paragraph" className="text-gray-600">
                  Acesso livre a cursos educacionais e técnicos sem custos.
                </Typograph>
              </div>

              <div>
                <Typograph tag="subtitle">
                  Plataforma moderna
                </Typograph>
                <Typograph tag="paragraph" className="text-gray-600">
                  Acesso livre a cursos educacionais e técnicos sem custos.
                </Typograph>
              </div>
            </div>
          </div>
        </section>

        

        {/* CALL TO ACTION */}
        <section className="bg-blue-600 py-20 text-center text-white">
          <Typograph tag="title" className="mb-4">
            Comece sua jornada de aprendizado
          </Typograph>

          <p className="text-blue-100 mb-8">
            Crie sua conta gratuitamente e tenha acesso aos cursos.
          </p>

          <a
            href="/auth/register-student"
            className="bg-yellow-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-hover transition"
          >
            Criar conta gratuita
          </a>
        </section>
      </div>
  
  );
};
