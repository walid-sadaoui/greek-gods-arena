import React from "react";
import { Link } from "react-router-dom";

interface LinkProps {
  to: string | { pathname: string };
  target?: "_blank" | "_self";
}

const AppLink: React.FC<LinkProps> = ({ to, target, children }) => {
  return (
    <Link
      to={to}
      target={target}
      className={
        "px-4 py-2 font-greek rounded-container bg-yellow-200 hover:bg-yellow-100 hover:border-black disabled:bg-gray-100 text-base disabled:text-gray-500 disabled:cursor-not-allowed border-2 border-transparent"
      }
    >
      {children}
    </Link>
  );
};

export default AppLink;
