import React from 'react';

const FormContainer = ({ children }) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 mx-auto'>{children}</div>
      </div>
    </div>
  );
};

export default FormContainer;
