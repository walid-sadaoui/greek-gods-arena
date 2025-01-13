import React from "react";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <h2 className="flex text-shadow items-center justify-center text-7xl text-outline text-white w-full h-36 bg-no-repeat bg-auto bg-center font-black text-center font-greek">
      {title}
    </h2>
  );
};

export default PageTitle;
