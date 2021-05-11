import axios from 'axios';
import { CartActionTypes } from './types';

export const addToCart = (id, qty) => {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: CartActionTypes.CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const saveShippingAddress = (data) => {
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };
};

export const savePaymentMethod = (paymentMethod) => {
  return (dispatch) => {
    dispatch({
      type: CartActionTypes.CART_SAVE_PAYMENT_METHOD,
      payload: paymentMethod,
    });
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
  };
};

export const removeFromCart = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: CartActionTypes.CART_REMOVE_ITEM, payload: id });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };
};
