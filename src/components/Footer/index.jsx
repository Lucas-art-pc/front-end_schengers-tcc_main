import banner from "/assets/images-schengers/logo-schengers-escrita-branca.png";

export const Footer = () => {
  return(
    <footer className="bg-blue-hover text-gray-300 mt-32">
  <div className="max-w-7xl mx-auto px-6 py-16">

    <div className="grid md:grid-cols-4 gap-12">

      {/* Logo e descrição */}
      <div className="space-y-4">
        <img
          src={banner}
          alt="Schengers"
          className="w-40"
        />

        <p className="text-sm text-gray-400 leading-relaxed">
          Plataforma educacional voltada para organização de estudos,
          cursos online e acompanhamento de progresso acadêmico.
        </p>
      </div>

      {/* Links úteis */}
      <div>
        <h3 className="text-white font-semibold mb-4">
          Links úteis
        </h3>

        <ul className="space-y-3 text-sm">
          <li>
            <a href="/cursos" className="hover:text-white transition">
              Cursos
            </a>
          </li>

          <li>
            <a href="/rotina" className="hover:text-white transition">
              Rotina de estudos
            </a>
          </li>

          <li>
            <a href="/atividades" className="hover:text-white transition">
              Atividades
            </a>
          </li>

          <li>
            <a href="/progresso" className="hover:text-white transition">
              Progresso
            </a>
          </li>
        </ul>
      </div>

      {/* Institucional */}
      <div>
        <h3 className="text-white font-semibold mb-4">
          Plataforma
        </h3>

        <ul className="space-y-3 text-sm">
          <li>
            <a href="/sobre" className="hover:text-white transition">
              Sobre
            </a>
          </li>

          <li>
            <a href="/contato" className="hover:text-white transition">
              Contato
            </a>
          </li>

          <li>
            <a href="/privacidade" className="hover:text-white transition">
              Política de privacidade
            </a>
          </li>

          <li>
            <a href="/termos" className="hover:text-white transition">
              Termos de uso
            </a>
          </li>
        </ul>
      </div>

      {/* Redes sociais */}
      <div>
        <h3 className="text-white font-semibold mb-4">
          Redes sociais
        </h3>

        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/plataforma_schengers/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            Instagram
          </a>

          <a
            href="https://www.linkedin.com/in/lucas-medina-bosso/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            LinkedIn
          </a>
        </div>
      </div>

    </div>

    <div className="border-t border-neutral-800 mt-12 pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between">
      <span>
        © {new Date().getFullYear()} Schengers. Todos os direitos reservados.
      </span>

      <span>
        Desenvolvido para fins educacionais.
      </span>
    </div>

  </div>
</footer>
  )
}