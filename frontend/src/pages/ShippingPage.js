import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../redux/cart/cartActions';

const ShippingPage = ({ history }) => {
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <h1>Shipping</h1>
      <form onSubmit={submitHandler}>
        <div className='form-group'>
          <label htmlFor='address'>Address</label>
          <input
            placeholder='Enter address'
            className='form-control'
            type='text'
            id='address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='city'>City</label>
          <input
            placeholder='Enter city'
            className='form-control'
            type='text'
            id='city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='postalCode'>Postal Code</label>
          <input
            placeholder='Enter postal code'
            className='form-control'
            type='text'
            id='postalCode'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='country'>Country</label>
          <input
            placeholder='Enter country'
            className='form-control'
            type='text'
            id='country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button className='btn btn-primary'>Continue</button>
      </form>
    </FormContainer>
  );
};

export default ShippingPage;
