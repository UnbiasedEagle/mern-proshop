import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className='d-flex justify-content-center mb-4'>
      <ol className='breadcrumb'>
        {step1 ? (
          <li className='breadcrumb-item active'>
            <Link to='/login'>Sign In</Link>
          </li>
        ) : (
          <li className='breadcrumb-item'>Sign In</li>
        )}
        {step2 ? (
          <li className='breadcrumb-item active'>
            <Link to='/shipping'>Shipping</Link>
          </li>
        ) : (
          <li className='breadcrumb-item'>Shipping</li>
        )}
        {step3 ? (
          <li className='breadcrumb-item active'>
            <Link to='/payment'>Payment</Link>
          </li>
        ) : (
          <li className='breadcrumb-item'>Payment</li>
        )}
        {step4 ? (
          <li className='breadcrumb-item active'>
            <Link to='/placeorder'>Place Order</Link>
          </li>
        ) : (
          <li className='breadcrumb-item'>Place Order</li>
        )}
      </ol>
    </nav>
  );
};

export default CheckoutSteps;
