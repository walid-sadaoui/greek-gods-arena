import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="flex items-center w-full p-2 text-white bg-gray-900 bg-opacity-50 sm:p-2">
      <Link
        to="/"
        className="px-4 py-2 rounded font-greek hover:bg-white hover:text-black"
      >
        Home
      </Link>
    </header>
  );
};

export default Header;
