import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Pagination from '../components/Pagination';
import Product from '../components/Product';
import ProductCarousel from '../components/ProductCarousel';
import { listProducts } from '../redux/product/productActions';

const HomePage = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.page || 1;

  const dispatch = useDispatch();

  const { loading, error, products, pages, page } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Fragment>
      {!keyword ? (
        <ProductCarousel></ProductCarousel>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Fragment>
          <Meta />
          <div className='row'>
            {products.map((product) => {
              return (
                <div
                  key={product._id}
                  className='col-sm-12 col-md-6 col-lg-4 col-xl-4'
                >
                  <Product product={product}></Product>
                </div>
              );
            })}
          </div>
          <Pagination
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          ></Pagination>
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomePage;
