import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message/Message";
import { addToCart, removeFromCart } from "../../redux/cart/cartActions";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? +location.search.split("=")[1] : 1;

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ul className="list-group list-group-flush">
            {cartItems.map((item) => {
              return (
                <li key={item.product} className="list-group-item">
                  <div className="row">
                    <div className="col-md-2">
                      <img
                        src={item.image}
                        className="img-fluid rounded"
                        alt={item.name}
                      />
                    </div>
                    <div className="col-md-4">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div className="col-md-2">${item.price}</div>
                    <div className="col-md-2">
                      <form>
                        <div className="form-group">
                          <select
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(addToCart(item.product, +e.target.value))
                            }
                            className="form-control"
                          >
                            {[...Array(item.countInStock)].map((_, idx) => {
                              return <option key={idx}>{idx + 1}</option>;
                            })}
                          </select>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-2">
                      <button
                        onClick={() => dispatch(removeFromCart(item.product))}
                        className="btn btn-light"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="col-md-4">
        <div className="card">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => {
                  return acc + item.qty;
                }, 0)}
                ) items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => {
                  return acc + item.qty * item.price;
                }, 0)
                .toFixed(2)}
            </li>
            <li className="list-group-item">
              <button
                onClick={checkoutHandler}
                className="btn btn-block btn-primary"
                disabled={cartItems.length === 0}
              >
                Proceed To Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
