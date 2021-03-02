import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="justify-content-center mb-4 mt-2">
      <ul className="nav d-flex justify-content-center">
        {step1 ? (
          <li className="nav-item">
            <Link to="/login">Sign In</Link>
          </li>
        ) : (
          <li className="nav-item disabled">Sign In</li>
        )}
        {step2 ? (
          <li className="nav-item">
            <Link to="/shipping">Shipping</Link>
          </li>
        ) : (
          <li className="nav-item disabled">Shipping</li>
        )}
        {step3 ? (
          <li className="nav-item">
            <Link to="/payment">Payment</Link>
          </li>
        ) : (
          <li className="nav-item disabled">Payment</li>
        )}
        {step4 ? (
          <li className="nav-item">
            <Link to="/placeorder">Place Order</Link>
          </li>
        ) : (
          <li className="breadcru disabledmb-item">Place Order</li>
        )}
      </ul>
    </nav>
  );
};

export default CheckoutSteps;
