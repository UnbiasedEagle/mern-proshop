import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../redux/order/orderActions';
import Loader from '../components/Loader';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { OrderActionsTypes } from '../redux/order/types';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

const OrderPage = ({ match, history }) => {
  const [message, setMessage] = useState('');
  const [paying, setPaying] = useState(false);

  const orderId = match.params.id;

  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state.orderDetails);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { success } = useSelector((state) => state.orderPay);
  const { success: orderDeliverSuccess, loading: orderDeliverLoading } =
    useSelector((state) => state.orderDeliver);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (!order || order._id !== orderId || success || orderDeliverSuccess) {
      dispatch({ type: OrderActionsTypes.ORDER_PAY_RESET });
      dispatch({ type: OrderActionsTypes.ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [
    dispatch,
    orderId,
    order,
    success,
    orderDeliverSuccess,
    history,
    userInfo,
  ]);

  if (loading) {
    return <Loader></Loader>;
  } else if (error) {
    return <Message variant='danger'>{error}</Message>;
  }

  const paymentData = {
    amount: Math.round(order.totalPrice * 100),
    name: userInfo.name,
    email: userInfo.email,
    address: order.shippingAddress.address,
    city: order.shippingAddress.city,
    postalCode: order.shippingAddress.postalCode,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setMessage('');

    setPaying(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        paymentData.id = id;
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const response = await axios.post(
          '/api/payments/process',
          paymentData,
          config
        );

        if (response.data.success) {
          dispatch(
            payOrder(orderId, {
              id: response.data.payment.id,
              status: response.data.payment.status,
            })
          );
          setPaying(false);
        }
      } catch (error) {
        setMessage(error.response.data.message);
        setPaying(false);
      }
    } else {
      setMessage(error.message);
      setPaying(false);
    }
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  return (
    <Fragment>
      <h1>Order {order._id}</h1>
      <div className='row'>
        <div className='col-md-8'>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>

              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Paid on {order.deliveredAt.slice(0, 10)}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </li>
            <li className='list-group-item'>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Paid on {order.paidAt.slice(0, 10)}
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </li>
            <li className='list-group-item'>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ul className='list-group list-group-flush'>
                  {order.orderItems.map((item, idx) => {
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
                  <div className='col'>${order.itemsPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>Shipping</div>
                  <div className='col'>${order.shippingPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>Tax</div>
                  <div className='col'>${order.taxPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>Total</div>
                  <div className='col'>${order.totalPrice}</div>
                </div>
              </li>
              {!order.isPaid && (
                <li className='list-group-item'>
                  {message && <Message variant='danger'>{message}</Message>}
                  <form onSubmit={submitHandler}>
                    <fieldset className='FormGroup'>
                      <div className='FormRow'>
                        <CardElement options={CARD_OPTIONS}></CardElement>
                      </div>
                    </fieldset>
                    <button className='btn btn-block btn-primary'>
                      {paying && (
                        <span
                          className='spinner-border spinner-border-sm mr-2'
                          role='status'
                          aria-hidden='true'
                        ></span>
                      )}
                      Pay ${order.totalPrice}
                    </button>
                  </form>
                </li>
              )}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <li className='list-group-item'>
                    <button
                      className='btn btn-primary btn-block'
                      onClick={deliverHandler}
                    >
                      {orderDeliverLoading && (
                        <span
                          className='spinner-border spinner-border-sm mr-2'
                          role='status'
                          aria-hidden='true'
                        ></span>
                      )}
                      Mark As Deliver
                    </button>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderPage;
