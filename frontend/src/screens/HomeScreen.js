import React from "react";
import Product from "../components/Product/Product";
import products from "../products";

const HomeScreen = () => {
  return (
    <React.Fragment>
      <h1>Latest Products</h1>
      <div className="row">
        {products.map((product) => {
          return (
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex align-items-stretch">
              <Product product={product}></Product>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default HomeScreen;
