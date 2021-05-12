import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { UserActionTypes } from '../redux/user/types';
import { getUserDetails, updateUserProfile } from '../redux/user/userActions';
import { listMyOrders } from '../redux/order/orderActions';

const ProfilePage = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const { user, error, loading } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success, loading: loadingUpdateProfile } = useSelector(
    (state) => state.userUpdateProfile
  );
  const {
    orders,
    loading: loadingMyOrders,
    error: errorMyOrders,
  } = useSelector((state) => state.orderListMy);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: UserActionTypes.USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
      dispatch(listMyOrders());
    }
  }, [history, userInfo, dispatch, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      const user = { name, email };

      if (password) {
        user.password = password;
      }

      dispatch(updateUserProfile(user));
    }
  };

  return (
    <div className='row'>
      <div className='col-md-3'>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                placeholder='Enter name'
                className='form-control'
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email Address</label>
              <input
                placeholder='Enter email'
                className='form-control'
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                placeholder='Enter password'
                className='form-control'
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                placeholder='Confirm password'
                className='form-control'
                type='password'
                id='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              {loadingUpdateProfile && (
                <span
                  className='spinner-border spinner-border-sm mr-2'
                  role='status'
                  aria-hidden='true'
                ></span>
              )}
              Update
            </button>
          </form>
        )}
      </div>
      <div className='col-md-9'>
        <h2>My Orders</h2>
        {loadingMyOrders ? (
          <Loader></Loader>
        ) : errorMyOrders ? (
          <Message variant='danger'>{errorMyOrders}</Message>
        ) : (
          <table className='table table-striped table-hover table-bordered table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.slice(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.slice(0, 10)
                      ) : (
                        <i
                          style={{
                            color: 'red',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                          className='fas fa-times'
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.slice(0, 10)
                      ) : (
                        <i
                          style={{
                            color: 'red',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                          className='fas fa-times'
                        ></i>
                      )}
                    </td>
                    <td>
                      <Link
                        className='btn btn-light btn-sm'
                        to={`/order/${order._id}`}
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
