import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { createOrder } from "../../redux/orders/orderActions";

const PlaceOrderScreen = ({ history }) => {
  let {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = useSelector((state) => state.cart);

  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const dispatch = useDispatch();

  const { success, order, error } = useSelector((state) => state.orderCreate);

  // Calculate Prices
  itemsPrice = addDecimal(
    cartItems.reduce((acc, item) => {
      return acc + item.qty * item.price;
    }, 0)
  );

  shippingPrice = addDecimal(itemsPrice > 100 ? 0 : 100);

  taxPrice = addDecimal(Number(0.15 * itemsPrice).toFixed(2));

  totalPrice = addDecimal(
    Number(shippingPrice) + Number(itemsPrice) + Number(taxPrice)
  );

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [success, history]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
        itemsPrice,
        totalPrice,
      })
    );
  };

  return (
    <React.Fragment>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row">
        <div className="col-md-8">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h2>Shipping</h2>
              <p>
                <strong>Address</strong>
                {shippingAddress.address}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode} {shippingAddress.country}
              </p>
            </li>
            <li className="list-group-item">
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </li>
            <li className="list-group-item">
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ul className="list-group list-group-flush">
                  {cartItems.map((item, idx) => {
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
                  <div className="col">${itemsPrice}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Shipping</div>
                  <div className="col">${shippingPrice}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Tax</div>
                  <div className="col">${taxPrice}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Total</div>
                  <div className="col">${totalPrice}</div>
                </div>
              </li>
              <li className="list-group-item">
                {error && <Message variant="danger">{error}</Message>}
              </li>
              <li className="list-group-item">
                <button
                  type="button"
                  disabled={cartItems.length === 0}
                  className="btn btn-block btn-primary"
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlaceOrderScreen;
