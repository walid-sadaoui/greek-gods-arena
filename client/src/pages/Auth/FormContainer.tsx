import React, { FunctionComponent } from 'react';

const FormContainer: FunctionComponent = ({ children }) => {
  return (
    <form className='flex flex-col w-full max-w-xl px-4 my-auto'>
      {children}
    </form>
  );
};

export default FormContainer;
