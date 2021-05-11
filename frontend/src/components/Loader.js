import React from 'react';

const Loader = () => {
  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        display: 'block',
        margin: 'auto',
      }}
      className='spinner-border'
      role='status'
    >
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default Loader;
