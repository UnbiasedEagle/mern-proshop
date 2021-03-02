import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";
import Spinner from "../../components/Spinner/Spinner";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../../redux/orders/orderActions";
import { OrderActionTypes } from "../../redux/orders/types";

const OrderScreen = ({ match, history }) => {
  const [sdkReady, setSdkReady] = useState(false);

  const orderId = match.params.id;

  const dispatch = useDispatch();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { userInfo } = useSelector((state) => state.userLogin);

  const { success: successPay, loading: loadingPay } = useSelector(
    (state) => state.orderPay
  );
  const { success: successDeliver, loading: loadingDeliver } = useSelector(
    (state) => state.orderDeliver
  );

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=INR`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || order._id !== orderId || successDeliver) {
      dispatch({ type: OrderActionTypes.ORDER_PAY_RESET });
      dispatch({ type: OrderActionTypes.ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, userInfo, successDeliver]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  if (loading) {
    return <Spinner></Spinner>;
  }
  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  order.itemsPrice = addDecimal(
    order.orderItems.reduce((acc, item) => {
      return acc + item.qty * item.price;
    }, 0)
  );

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  return (
    <React.Fragment>
      <h1>Order {order._id}</h1>
      <div className="row">
        <div className="col-md-8">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
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
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode}{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </li>
            <li className="list-group-item">
              <div className="mb-3">
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {order.paymentMethod}
              </div>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </li>
            <li className="list-group-item">
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ul className="list-group list-group-flush">
                  {order.orderItems.map((item, idx) => {
                    return (
                      <li key={idx} className="list-group-item">
                        <div className="row">
                          <div className="col-md-1">
                            <img
                              src={item.image}
                              className="img-fluid rounded"
                              alt={item.name}
                            />
                          </div>
                          <div className="col">
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div className="col-md-4">
                            {item.qty} x ${item.price} = $$
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
        <div className="col-md-4">
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <h2>Order Summary</h2>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Items</div>
                  <div className="col">${order.itemsPrice}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Shipping</div>
                  <div className="col">${order.shippingPrice}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Tax</div>
                  <div className="col">${order.taxPrice}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Total</div>
                  <div className="col">${order.totalPrice}</div>
                </div>
              </li>
              {!order.isPaid && (
                <li className="list-group-item">
                  {loadingPay && <Spinner></Spinner>}
                  {!sdkReady ? (
                    <Spinner></Spinner>
                  ) : (
                    <PayPalButton
                      currency="INR"
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                  )}
                </li>
              )}
              {loadingDeliver && <Spinner></Spinner>}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <li className="list-group-item">
                    <button
                      className="btn btn-block btn-primary"
                      onClick={deliverHandler}
                    >
                      Mark as Delivered
                    </button>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderScreen;
