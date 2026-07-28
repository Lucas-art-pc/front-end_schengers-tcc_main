import { useState, useEffect } from "react";
import { NavBar } from "../NavBar";
import logo from "/assets/images-schengers/logo-schengers-branca.png";
import banner from "/assets/images-schengers/logo-schengers-escrita-branca.png";

export const Heading = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Fecha o menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Bloqueia scroll do body quando menu móbile está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="bg-blue-primary relative z-50">
      <div
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        {/* LOGO */}
        <a href="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="logo" className="h-9 sm:h-10 w-auto" />
          <img src={banner} alt="Schengers" className="h-4 sm:h-5 w-auto" />
        </a>

        {/* NAV — desktop */}
        <div className="hidden lg:flex">
          <NavBar />
        </div>

        {/* BOTÃO HAMBÚRGUER — mobile/tablet */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          className="lg:hidden flex flex-col justify-center items-center gap-1.25 w-10 h-10 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span
            className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-1.75" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-1.75" : ""
            }`}
          />
        </button>
      </div>

      {/* MENU MÓBILE — dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <NavBar mobile onClose={() => setMenuOpen(false)} />
      </div>
    </header>
  );
};