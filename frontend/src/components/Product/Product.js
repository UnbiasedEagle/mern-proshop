import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

const Product = ({ product }) => {
  return (
    <div className="card my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <img className="img-fluid" src={product.image}></img>
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h5 className="card-title">{product.name}</h5>
        </Link>
        <div className="card-text">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          ></Rating>
        </div>
        <div className="card-text py-3">
          <h3>${product.price}</h3>
        </div>
      </div>
    </div>
  );
};

export default Product;
