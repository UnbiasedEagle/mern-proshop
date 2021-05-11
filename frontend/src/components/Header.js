import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/user/userActions';
import { UserActionTypes } from '../redux/user/types';
import { OrderActionsTypes } from '../redux/order/types';
import SearchBox from './SearchBox';

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch({ type: UserActionTypes.USER_DETAILS_RESET });
    dispatch({ type: OrderActionsTypes.ORDER_LIST_MY_RESET });
    dispatch({ type: UserActionTypes.USER_LIST_RESET });
  };

  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            ProShop
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <SearchBox></SearchBox>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/cart'>
                  <i className='fas fa-shopping-cart'></i> Cart
                </NavLink>
              </li>
              {userInfo ? (
                <li className='nav-item dropdown'>
                  <span
                    className='nav-link dropdown-toggle'
                    id='navbarDropdown'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    {userInfo.name}
                  </span>
                  <div
                    className='dropdown-menu'
                    aria-labelledby='navbarDropdown'
                  >
                    <Link className='dropdown-item' to='/profile'>
                      Profile
                    </Link>

                    <span
                      onClick={logoutHandler}
                      style={{ cursor: 'pointer' }}
                      className='dropdown-item'
                    >
                      Logout
                    </span>
                  </div>
                </li>
              ) : (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/login'>
                    <i className='fas fa-user'></i> Sign In
                  </NavLink>
                </li>
              )}
              {userInfo && userInfo.isAdmin && (
                <li className='nav-item dropdown'>
                  <span
                    className='nav-link dropdown-toggle'
                    id='adminMenu'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    Admin
                  </span>
                  <div className='dropdown-menu' aria-labelledby='adminMenu'>
                    <Link className='dropdown-item' to='/admin/userlist'>
                      Users
                    </Link>
                    <Link className='dropdown-item' to='/admin/productlist'>
                      Products
                    </Link>
                    <Link className='dropdown-item' to='/admin/orderlist'>
                      Orders
                    </Link>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
