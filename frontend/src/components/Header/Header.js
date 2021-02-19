import React from "react";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          ProShop
        </a>
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

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/cart">
                <i className="fas fa-shopping-cart"></i> Cart
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                <i className="fas fa-user"></i> Sign In
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
