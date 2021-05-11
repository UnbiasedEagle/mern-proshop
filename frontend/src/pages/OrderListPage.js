import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../redux/order/orderActions';

const OrderListPage = ({ history }) => {
  const dispatch = useDispatch();

  const { error, loading, orders } = useSelector((state) => state.orderList);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/login');
    } else {
      dispatch(listOrders());
    }
  }, [dispatch, history, userInfo]);

  console.log(orders);

  return (
    <Fragment>
      <h1>Orders</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <table className='table table-striped table-hover table-bordered table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
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
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.slice(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          color: 'red',
                        }}
                        className='fas fa-times'
                      ></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i
                        className='fas fa-times'
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          color: 'red',
                        }}
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
    </Fragment>
  );
};

export default OrderListPage;
