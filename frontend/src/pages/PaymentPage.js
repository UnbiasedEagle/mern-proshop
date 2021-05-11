import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../redux/cart/cartActions';

const PaymentPage = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('Stripe');

  const { shippingAddress } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <h1>Payment Method</h1>
      <h2>Select Method</h2>
      <div className='row'>
        <div className='col'>
          <form onSubmit={submitHandler}>
            <div className='form-group ml-5'>
              <input
                id='stripe'
                value='Stripe'
                className='form-check-input'
                type='radio'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor='stripe'>Stripe</label>
            </div>
            <button className='btn btn-primary mr-3'>Continue</button>
          </form>
        </div>
      </div>
    </FormContainer>
  );
};

export default PaymentPage;
