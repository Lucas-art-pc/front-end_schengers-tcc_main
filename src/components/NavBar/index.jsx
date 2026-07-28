import { LinkVariable } from "../Link";

const links = [
  { href: "/", label: "Home", type: "secondary" },
  { href: "/learn-more", label: "Saiba Mais", type: "secondary" },
  { href: "/courses-schengers", label: "Cursos", type: "secondary" },
  { href: "/auth/register-teacherUser", label: "Trabalhe conosco", type: "secondary" },
  { href: "/auth/register-student", label: "ÁREA ESTUDANTE", type: "primary" },
];

export const NavBar = ({ mobile = false, onClose }) => {
  // ── Desktop ──────────────────────────────────────────────
  if (!mobile) {
    return (
      <nav className="flex gap-6 items-center">
        {links.map(({ href, label, type }) => (
          <LinkVariable key={href} href={href} type={type}>
            {label}
          </LinkVariable>
        ))}
      </nav>
    );
  }

  // ── Mobile (dropdown) ────────────────────────────────────
  return (
    <nav className="bg-blue-primary border-t border-white/10 px-4 pb-6 pt-4 flex flex-col gap-1">
      {links.map(({ href, label, type }) => (
        <a
          key={href}
          href={href}
          onClick={onClose}
          className={`
            block w-full text-left px-4 py-3 rounded-lg font-medium text-sm transition
            ${
              type === "primary"
                ? "mt-2 bg-yellow-primary text-white text-center font-semibold hover:bg-yellow-hover"
                : "text-white/90 hover:bg-white/10"
            }
          `}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};