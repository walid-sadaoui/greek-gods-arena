import React from "react";

interface ContainerProps {
  title?: string;
  subtitle?: string;
}

const Container: React.FC<ContainerProps> = ({ children, title, subtitle }) => {
  return (
    <main
      className={`flex flex-col items-center justify-center backdrop-blur-md backdrop-brightness-150 mx-auto my-auto rounded-3xl w-auto h-auto p-12`}
    >
      {title && (
        <h2 className="px-4 py-2 text-2xl text-center font-greek">{title}</h2>
      )}
      {subtitle && <p className="px-4 text-center text-md">{subtitle}</p>}
      {children}
    </main>
  );
};

export const ContainerSection: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col items-center w-full h-full p-4">
      {children}
    </div>
  );
};

export const ContainerRow: React.FC = ({ children }) => {
  return <div className="flex items-center w-full h-full p-4">{children}</div>;
};

export const ContainerColumn: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col items-center w-full h-full p-4">
      {children}
    </div>
  );
};

export const Separator: React.FC = () => {
  return <span className="w-px mx-auto my-4 bg-gray-300 h-3/4"></span>;
};

export default Container;
