import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export const TopBar = ( ) => {
  return(
    <div>
      <div className="flex w-full text-white text-sm">
        {/* Lado azul */}
        <div className="flex-1 bg-blue-primary">
          <div className="max-w-7xl mx-auto flex items-center justify-center px-4 h-10">
            <span className="font-semibold">
              SCHENGERS - Sua plataforma de estudos gratuita!
            </span>
          </div>
        </div>

        {/* Lado cinza */}
        <div className="flex-1 bg-gray-600">
          <div className="max-w-7xl mx-auto flex items-center justify-center px-4 h-10 gap-4 text-lg">
            <a
              href="http://facebook.com/camdaoficial"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              <FaFacebook />
            </a>

            <a
              href="http://instagram.com/camdaoficial"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-400"
            >
              <FaInstagram />
            </a>

            <a
              href="http://youtube.com.br/camdaoficial"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-400"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}