import Icon, { IconName } from "components/common/Icon";
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between w-full p-2 text-white bg-gray-900 bg-opacity-50 sm:p-2">
      <Link
        to="/"
        className="px-4 py-2 rounded-container font-greek hover:bg-white hover:text-black"
      >
        Home
      </Link>
      <Link
        to={{ pathname: "https://github.com/walid-sadaoui/greek-gods-arena" }}
        target="_blank"
        className="p-2 rounded-container hover:bg-white hover:text-black"
      >
        <Icon icon={IconName.GITHUB} className="text-3xl" />
      </Link>
    </header>
  );
};

export default Header;
