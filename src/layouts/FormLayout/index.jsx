import { useNavigate } from "react-router-dom";
import { Typograph } from "../../components/Typograph";

export const FormLayout = ({ children, title, description, onSubmit }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 flex items-center gap-2 text-gray-500 hover:text-blue-primary transition"
        >
          ← <span className="text-sm">Voltar</span>
        </button>
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-xl bg-white shadow-lg rounded-xl p-8 space-y-6"
      >
        {/* Botão voltar */}
        

        {title && (
          <div className="text-center">
            <Typograph tag="title" className="text-blue-primary">
              {title}
            </Typograph>

            {description && (
              <Typograph tag="paragraph" className="text-gray-500">
                {description}
              </Typograph>
            )}
          </div>
        )}

        <div className="space-y-4">{children}</div>
      </form>
    </div>
  );
};