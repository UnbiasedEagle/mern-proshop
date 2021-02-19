import React from "react";

const Product = ({ product }) => {
  return (
    <div className="card my-3 p-3 rounded">
      <a href={`/product/${product._id}`}>
        <img className="img-fluid" src={product.image}></img>
      </a>
      <div className="card-body">
        <a href={`/product/${product._id}`}>
          <h5 className="card-title">{product.name}</h5>
        </a>
        <div className="card-text">
          <div className="my-3">
            {product.rating} from {product.numReviews} reviews
          </div>
        </div>
        <div className="card-text">
          <h3>${product.price}</h3>
        </div>
      </div>
    </div>
  );
};

export default Product;
