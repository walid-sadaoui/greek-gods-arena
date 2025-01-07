import React from "react";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <h2 className="text-6xl font-black text-center text-outline font-greek">
      {title}
    </h2>
  );
};

export default PageTitle;
