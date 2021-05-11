import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <div className='card my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          className='card-img-top img-fluid'
          alt={product.name}
        />
      </Link>
      <div className='card-body'>
        <Link to={`/product/${product._id}`}>
          <h5 className='card-title'>{product.name}</h5>
        </Link>
        <div className='card-text my-3'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          ></Rating>
        </div>
        <h3 className='card-text my-3'>${product.price}</h3>
      </div>
    </div>
  );
};

export default Product;
