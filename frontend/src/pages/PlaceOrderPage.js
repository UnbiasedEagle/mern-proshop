import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../redux/order/orderActions';

const PlaceOrderPage = ({ history }) => {
  const dispatch = useDispatch();

  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );

  const { loading, success, order, error } = useSelector(
    (state) => state.orderCreate
  );

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [success, history]);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(
    cartItems.reduce((acc, curr) => {
      return acc + curr.qty * curr.price;
    }, 0)
  );

  const shippingPrice = addDecimals(itemsPrice < 100 ? 10 : 0);

  const taxPrice = addDecimals(0.15 * itemsPrice);

  const totalPrice = addDecimals(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  );

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        shippingPrice,
        taxPrice,
        itemsPrice,
      })
    );
  };

  return (
    <Fragment>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className='row'>
        <div className='col-md-8'>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </li>
            <li className='list-group-item'>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </li>
            <li className='list-group-item'>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ul className='list-group list-group-flush'>
                  {cartItems.map((item, idx) => {
                    return (
                      <li key={item.product} className='list-group-item'>
                        <div className='row'>
                          <div className='col-md-2'>
                            <img
                              className='img-fluid rounded'
                              src={item.image}
                              alt={item.name}
                            />
                          </div>
                          <div className='col'>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div className='col-md-4'>
                            {item.qty} X ${item.price} = $
                            {item.qty * item.price}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          </ul>
        </div>
        <div className='col-md-4'>
          <div className='card'>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                <h2 className='text-center'>Order Summary</h2>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>Items</div>
                  <div className='col'>${itemsPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>Shipping</div>
                  <div className='col'>${shippingPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>Tax</div>
                  <div className='col'>${taxPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>Total</div>
                  <div className='col'>${totalPrice}</div>
                </div>
              </li>
              {error && (
                <li className='list-group-item'>
                  <Message variant='danger'>{error}</Message>
                </li>
              )}
              <li className='list-group-item'>
                <button
                  disabled={cartItems.length === 0}
                  className='btn btn-primary btn-block'
                  onClick={placeOrderHandler}
                >
                  {loading && (
                    <span
                      className='spinner-border spinner-border-sm mr-2'
                      role='status'
                      aria-hidden='true'
                    ></span>
                  )}
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PlaceOrderPage;
