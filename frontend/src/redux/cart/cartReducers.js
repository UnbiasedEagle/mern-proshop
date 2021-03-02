import { CartActionTypes } from "./types";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CartActionTypes.CART_ADD_ITEM:
      const item = action.payload;
      const isItemAlreadyPresent = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      );
      if (isItemAlreadyPresent) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) => {
            return cartItem.product === item.product ? item : cartItem;
          }),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case CartActionTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.product !== action.payload
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
    default:
      return state;
  }
};
