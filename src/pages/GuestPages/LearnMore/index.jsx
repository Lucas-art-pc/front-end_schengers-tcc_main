import { Typograph } from "../../../components/Typograph";

export const LearnMore = () => {
  return (
    <section className="relative py-24 px-6 bg-linear-to-b from-blue-secondary to-white">
      <div className="max-w-7xl mx-auto">
        {/* INTRODUÇÃO */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full mb-6 text-sm font-medium">
            Sobre a Plataforma
          </div>

          <div className="text-blue-900">
            <Typograph tag="title_large">
              Conheça mais sobre o projeto
            </Typograph>
          </div>

          <div className="max-w-3xl mx-auto mt-6 text-gray-600">
            <Typograph tag="paragraph">
              Esta plataforma foi desenvolvida como Trabalho de Conclusão de
              Curso com o objetivo de proporcionar uma ferramenta educacional
              moderna, permitindo que estudantes tenham acesso a cursos,
              atividades e acompanhamento do seu progresso acadêmico.
            </Typograph>
          </div>
        </div>

        {/* ESTATÍSTICAS */}
        <div className="grid md:grid-cols-4 gap-8 mb-24">
          <div className="bg-white border border-blue-100 p-8 rounded-2xl text-center shadow-sm hover:shadow-md transition">
            <div className="text-blue-600">
              <Typograph tag="title_small">12</Typograph>
            </div>
            <Typograph tag="paragraph">Cursos disponíveis</Typograph>
          </div>

          <div className="bg-white border border-blue-100 p-8 rounded-2xl text-center shadow-sm hover:shadow-md transition">
            <div className="text-blue-600">
              <Typograph tag="title_small">120+</Typograph>
            </div>
            <Typograph tag="paragraph">Alunos cadastrados</Typograph>
          </div>

          <div className="bg-white border border-blue-100 p-8 rounded-2xl text-center shadow-sm hover:shadow-md transition">
            <div className="text-blue-600">
              <Typograph tag="title_small">85</Typograph>
            </div>
            <Typograph tag="paragraph">Atividades</Typograph>
          </div>

          <div className="bg-white border border-blue-100 p-8 rounded-2xl text-center shadow-sm hover:shadow-md transition">
            <div className="text-blue-600">
              <Typograph tag="title_small">300+</Typograph>
            </div>
            <Typograph tag="paragraph">Aulas disponíveis</Typograph>
          </div>
        </div>

        {/* TECNOLOGIAS */}
        <div className="mb-24">
          <div className="text-center mb-12 text-blue-900">
            <Typograph tag="title">Tecnologias utilizadas</Typograph>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100 text-center">
              <div className="text-blue-700 mb-2">
                <Typograph tag="subtitle">React</Typograph>
              </div>
              <Typograph tag="paragraph">
                Desenvolvimento da interface dinâmica da plataforma.
              </Typograph>
            </div>

            <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100 text-center">
              <div className="text-blue-700 mb-2">
                <Typograph tag="subtitle">Tailwind CSS</Typograph>
              </div>
              <Typograph tag="paragraph">
                Estilização moderna e responsiva da aplicação.
              </Typograph>
            </div>

            <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100 text-center">
              <div className="text-blue-700 mb-2">
                <Typograph tag="subtitle">Laravel</Typograph>
              </div>
              <Typograph tag="paragraph">
                Backend responsável pela API e regras de negócio.
              </Typograph>
            </div>

            <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100 text-center">
              <div className="text-blue-700 mb-2">
                <Typograph tag="subtitle">PostgreeSQL</Typograph>
              </div>
              <Typograph tag="paragraph">
                Banco de dados utilizado para armazenamento das informações.
              </Typograph>
            </div>
          </div>
        </div>

        {/* FUNCIONALIDADES */}
        <div className="mb-24">
          <div className="text-center mb-12 text-blue-900">
            <Typograph tag="title">Principais funcionalidades</Typograph>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-blue-100 rounded-2xl hover:shadow-md transition">
              <div className="text-blue-700 mb-2">
                <Typograph tag="subtitle">Sistema de cursos</Typograph>
              </div>
              <Typograph tag="paragraph">
                Organização de cursos educacionais em uma plataforma digital
                acessível para estudantes.
              </Typograph>
            </div>

            <div className="p-8 border border-blue-100 rounded-2xl hover:shadow-md transition">
              <div className="text-blue-700 mb-2">
                <Typograph tag="subtitle">Atividades interativas</Typograph>
              </div>
              <Typograph tag="paragraph">
                Exercícios que auxiliam na fixação do conteúdo estudado.
              </Typograph>
            </div>

            <div className="p-8 border border-blue-100 rounded-2xl hover:shadow-md transition">
              <div className="text-blue-700 mb-2">
                <Typograph tag="subtitle">
                  Acompanhamento de progresso
                </Typograph>
              </div>
              <Typograph tag="paragraph">
                Permite que o aluno visualize seu desempenho dentro da
                plataforma.
              </Typograph>
            </div>
          </div>
        </div>

        {/* EQUIPE */}
        <div className="text-center">
          <div className="text-blue-900 mb-10">
            <Typograph tag="title">Equipe do projeto</Typograph>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-blue-100 rounded-2xl">
              <div>
              <Typograph tag="subtitle">Lucas Medina Bosso</Typograph>
              </div>
              <Typograph tag="paragraph">
                Desenvolvimento Backend, Frontend e Banco de dados
              </Typograph>
            </div>

            <div className="p-8 bg-white border border-blue-100 rounded-2xl">
              <Typograph tag="subtitle">Lucas Henrique Susae</Typograph>
              <Typograph tag="paragraph">Identidade Visual e criação de imagens</Typograph>
            </div>

            <div className="p-8 bg-white border border-blue-100 rounded-2xl">
              <Typograph tag="subtitle">Victor Hugo Cavalcante </Typograph>
              <Typograph tag="paragraph">Artes e gerenciamento de redes sociais</Typograph>
            </div>

            <div className="p-8 bg-white border border-blue-100 rounded-2xl">
              <Typograph tag="subtitle">Sofia Luiz de Oliveira</Typograph>
              <Typograph tag="paragraph">Documentação e busca de termos de privacidade</Typograph>
            </div>

            <div className="p-8 bg-white border border-blue-100 rounded-2xl">
              <Typograph tag="subtitle">Sofia Diciano Lucena</Typograph>
              <Typograph tag="paragraph">Documentação e pesquisas de referência</Typograph>
            </div>

            <div className="p-8 bg-white border border-blue-100 rounded-2xl">
              <Typograph tag="subtitle">Sthefanie Rayane Oliveira</Typograph>
              <Typograph tag="paragraph">Documentação e Modelagem das normas</Typograph>
            </div>
          </div>

          <div className="mt-10 text-gray-500">
            <Typograph tag="paragraph">
              Orientadora: Prof. Lucimara Fernandes Bezerra
            </Typograph>
          </div>
        </div>
      </div>
    </section>
  );
};
