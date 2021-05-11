import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../redux/cart/cartActions';

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <div className='row'>
      <div className='col-md-8'>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty. <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ul className='list-group list-group-flush'>
            {cartItems.map((item) => {
              return (
                <li className='list-group-item' key={item.product}>
                  <div className='row'>
                    <div className='col-md-2'>
                      <img
                        className='img-fluid rounded'
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div className='col-md-3'>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div className='col-md-2'>${item.price}</div>
                    <div className='col-md-2'>
                      <div className='form-group'>
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                          className='form-control'
                          id='qty'
                        >
                          {[...Array(item.countInStock).keys()].map((el) => {
                            return (
                              <option key={el + 1} value={el + 1}>
                                {el + 1}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className='col-md-2'>
                      <button
                        className='btn btn-light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className='col-md-4'>
        <div className='card'>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, curr) => {
                  return acc + curr.qty;
                }, 0)}
                ) items
              </h2>
              $
              {cartItems
                .reduce((acc, curr) => {
                  return acc + curr.qty * curr.price;
                }, 0)
                .toFixed(2)}
            </li>
            <li className='list-group-item'>
              <button
                className='btn btn-primary btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
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

export default CartPage;
