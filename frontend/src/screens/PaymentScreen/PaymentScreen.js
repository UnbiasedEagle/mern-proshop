import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import FormContainer from "../../components/FormContainer/FormContainer";
import { savePaymentMethod } from "../../redux/cart/cartActions";

const PaymentScreen = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo]);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <h1>Payment Method</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <legend className="mb-3">Select Payment Method</legend>
          <div className="custom-control custom-radio">
            <input
              type="radio"
              id="PayPal"
              name="paymentMethod"
              className="custom-control-input"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="custom-control-label" htmlFor="PayPal">
              PayPal or Credit Card
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default PaymentScreen;
