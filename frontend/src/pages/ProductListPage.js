import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../redux/product/productActions';
import { ProductActionTypes } from '../redux/product/types';
import Pagination from '../components/Pagination';

const ProductListPage = ({ history, match }) => {
  const pageNumber = match.params.page || 1;

  const dispatch = useDispatch();

  const { error, loading, products, pages, page } = useSelector(
    (state) => state.productList
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    product,
    error: productCreateError,
    loading: productCreateLoading,
    success: productCreateSuccess,
  } = useSelector((state) => state.productCreate);

  const {
    success: productDeleteSuccess,
    error: productDeleteError,
    loading: productDeleteLoading,
  } = useSelector((state) => state.productDelete);

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/login');
    } else if (productCreateSuccess) {
      history.push(`/admin/product/${product._id}/edit`);
      dispatch({ type: ProductActionTypes.PRODUCT_CREATE_RESET });
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    productDeleteSuccess,
    productCreateSuccess,
    product,
    pageNumber,
  ]);

  const deleteHandler = (productId) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(productId));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <Fragment>
      <div className='row d-flex align-items-center'>
        <div className='col'>
          <h1>Products</h1>
        </div>
        <div className='col text-right'>
          <button onClick={createProductHandler} className='btn btn-primary'>
            <i className='fas fa-plus'></i> Create Product
          </button>
        </div>
      </div>
      {productDeleteLoading && <Loader></Loader>}
      {productDeleteError && (
        <Message variant='danger'>{productDeleteError}</Message>
      )}
      {productCreateLoading && <Loader></Loader>}
      {productCreateError && (
        <Message variant='danger'>{productDeleteError}</Message>
      )}
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Fragment>
          <table className='table table-striped table-hover table-bordered table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Link
                        className='btn btn-light btn-sm'
                        to={`/admin/product/${product._id}/edit`}
                      >
                        <i className='fas fa-edit'></i>
                      </Link>
                      <button
                        className='btn btn-sm btn-danger'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination pages={pages} page={page} isAdmin={true}></Pagination>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductListPage;
