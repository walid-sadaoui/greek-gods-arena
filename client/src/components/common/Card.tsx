import React, { FunctionComponent } from "react";

const Card: FunctionComponent = ({ children }) => {
  return (
    <section className="relative flex flex-col items-center w-48 p-4 bg-white border-2 border-black hover:z-20 rounded-container">
      {children}
    </section>
  );
};

export default Card;
