import React from "react";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <h2 className="flex items-center justify-center text-6xl bg-[url('/Banner.svg')] w-full h-48 bg-no-repeat bg-auto bg-center font-black text-center text-black font-greek">
      {title}
    </h2>
  );
};

export default PageTitle;
