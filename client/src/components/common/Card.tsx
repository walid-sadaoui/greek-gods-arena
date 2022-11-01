import React, { FunctionComponent } from 'react';

const Card: FunctionComponent = ({ children }) => {
  return (
    <section className='relative hover:z-20 flex flex-col items-center p-4 bg-white border-2 border-black w-48 rounded-container'>
      {children}
    </section>
  );
};

export default Card;
