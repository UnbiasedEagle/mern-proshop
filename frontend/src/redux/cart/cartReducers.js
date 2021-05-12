import { CartActionTypes } from './types';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CartActionTypes.CART_ADD_ITEM:
      const item = action.payload;
      const itemPresent = state.cartItems.find(
        (el) => el.product === item.product
      );
      if (!itemPresent) {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((el) =>
            el.product === item.product ? item : el
          ),
        };
      }
    case CartActionTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    case CartActionTypes.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CartActionTypes.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CartActionTypes.CART_CLEAR:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
