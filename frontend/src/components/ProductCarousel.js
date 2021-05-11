import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Message from './Message';
import Loader from './Loader';
import { listTopProducts } from '../redux/product/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const { products, error, loading } = useSelector((state) => state.productTop);

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div
          id='product-carousel'
          className='carousel slide bg-dark'
          data-ride='carousel'
        >
          <ol className='carousel-indicators'>
            <li
              data-target='#product-carousel'
              data-slide-to='0'
              className='active'
            ></li>
            <li data-target='#product-carousel' data-slide-to='1'></li>
            <li data-target='#product-carousel' data-slide-to='2'></li>
          </ol>
          <div className='carousel-inner'>
            {products.map((product, idx) => {
              return (
                <div
                  key={product._id}
                  className={`carousel-item ${idx === 0 && 'active'}`}
                >
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.image}
                      className='d-block w-100 img-fluid'
                      alt={product.name}
                    />
                    <div className='carousel-caption d-none d-md-block'>
                      <h2>
                        {product.name} (${product.price})
                      </h2>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <a
            className='carousel-control-prev'
            href='#product-carousel'
            role='button'
            data-slide='prev'
          >
            <span
              className='carousel-control-prev-icon'
              aria-hidden='true'
            ></span>
            <span className='sr-only'>Previous</span>
          </a>
          <a
            className='carousel-control-next'
            href='#product-carousel'
            role='button'
            data-slide='next'
          >
            <span
              className='carousel-control-next-icon'
              aria-hidden='true'
            ></span>
            <span className='sr-only'>Next</span>
          </a>
        </div>
      )}
    </Fragment>
  );
};

export default ProductCarousel;
