import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { OrderActionTypes } from "../../redux/orders/types";
import { UserActionTypes } from "../../redux/users/types";
import { clearUserRegister, logout } from "../../redux/users/userActions";
import SearchBox from "../SearchBox/SearchBox";

const Header = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearUserRegister());
    dispatch({ type: OrderActionTypes.ORDER_LIST_MY_RESET });
    dispatch({ type: UserActionTypes.USER_DETAILS_RESET });
    dispatch({ type: UserActionTypes.USER_LIST_RESET });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ProShop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
          aria-controls="mobile-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <SearchBox></SearchBox>
        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                <i className="fas fa-shopping-cart"></i> Cart
              </NavLink>
            </li>
            {userInfo ? (
              <li className="nav-item dropdown">
                <span
                  role="button"
                  data-toggle="dropdown"
                  style={{ cursor: "pointer" }}
                  className="nav-link dropdown-toggle"
                >
                  {userInfo.name}
                </span>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={logoutHandler}
                    className="dropdown-item"
                  >
                    Logout
                  </span>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  <i className="fas fa-user"></i> Sign In
                </NavLink>
              </li>
            )}
            {userInfo && userInfo.isAdmin && (
              <li className="nav-item dropdown">
                <span
                  role="button"
                  data-toggle="dropdown"
                  style={{ cursor: "pointer" }}
                  className="nav-link dropdown-toggle"
                >
                  ADMIN
                </span>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/admin/userlist">
                    Users
                  </Link>
                  <Link className="dropdown-item" to="/admin/productlist">
                    Products
                  </Link>
                  <Link className="dropdown-item" to="/admin/orderlist">
                    Orders
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
