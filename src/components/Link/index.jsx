import { Link } from "react-router-dom";

const VARIABLE_LINK = {
  primary: "flex justify-center items-center bg-yellow-primary text-white px-4 py-1 rounded hover:bg-yellow-hover transition",
  
  secondary: "text-white px-2 transition text-center rounded hover:text-gray-300",
  
  subtle: "text-sm text-gray-500 hover:text-gray-700 hover:underline transition duration-200"
};

export const LinkVariable = ({children, href, type, ...props}) => {

  const TypeLink = VARIABLE_LINK[type] || 'secondary';
  return (
    <Link
    {...props}
    to={href}
    className={TypeLink}
    >
      {children}
    </Link>
  );
};
