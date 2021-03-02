import axios from "axios";
import { CartActionTypes } from "./types";

export const addToCart = (id, qty) => {
  return async (dispatch) => {
    const {
      data: { product },
    } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CartActionTypes.CART_ADD_ITEM,
      payload: {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty,
      },
    });
  };
};

export const removeFromCart = (id) => {
  return {
    type: CartActionTypes.CART_REMOVE_ITEM,
    payload: id,
  };
};

export const saveShippingAddress = (data) => {
  return {
    type: CartActionTypes.CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  };
};

export const savePaymentMethod = (paymentMethod) => {
  return {
    type: CartActionTypes.CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  };
};
