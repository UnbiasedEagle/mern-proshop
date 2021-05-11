import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listProductDetails,
  createReview,
} from '../redux/product/productActions';
import { ProductActionTypes } from '../redux/product/types';
import Meta from '../components/Meta';

const ProductPage = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const { error, loading, product } = useSelector(
    (state) => state.productDetails
  );
  const {
    error: productCreateReviewError,
    loading: productCreateReviewLoading,
    success,
  } = useSelector((state) => state.productCreateReview);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (success) {
      setRating(0);
      setComment('');
      dispatch({ type: ProductActionTypes.PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch, success]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReview(match.params.id, {
        rating: Number(rating),
        comment,
      })
    );
  };

  return (
    <Fragment>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Fragment>
          <Meta title={product.name}></Meta>
          <div className='row'>
            <div className='col-md-6'>
              <img
                className='img-fluid'
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className='col-md-3'>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                  <h3>{product.name}</h3>
                </li>
                <li className='list-group-item'>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  ></Rating>
                </li>
                <li className='list-group-item'>Price: ${product.price}</li>
                <li className='list-group-item'>
                  Description: {product.description}
                </li>
              </ul>
            </div>
            <div className='col-md-3'>
              <div className='card'>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>
                    <div className='row'>
                      <div className='col'>Price:</div>
                      <div className='col'>
                        <strong>${product.price}</strong>
                      </div>
                    </div>
                  </li>
                  <li className='list-group-item'>
                    <div className='row'>
                      <div className='col'>Status:</div>
                      <div className='col'>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <li className='list-group-item'>
                      <div className='row'>
                        <div className='col'>Qty:</div>
                        <div className='col'>
                          <div className='form-group'>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                              className='form-control'
                              id='qty'
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (el) => {
                                  return (
                                    <option key={el + 1} value={el + 1}>
                                      {el + 1}
                                    </option>
                                  );
                                }
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                  <li className='list-group-item'>
                    <button
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                      className='btn btn-block btn-primary'
                    >
                      Add To Cart
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='row my-3'>
            <div className='col-md-6'>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ul className='list-group list-group-flush'>
                {product.reviews.map((review) => {
                  return (
                    <li key={review._id} className='list-group-item'>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating}></Rating>
                      <p>{review.createdAt.slice(0, 10)}</p>
                      <p>{review.comment}</p>
                    </li>
                  );
                })}
                <li className='list-group-item'>
                  <h2>Write a Customer Review</h2>
                  {productCreateReviewError && (
                    <Message variant='danger'>
                      {productCreateReviewError}
                    </Message>
                  )}
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <div className='form-group'>
                        <select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          className='form-control'
                          id='rating'
                        >
                          <option value=''>Select Rating</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </select>
                      </div>
                      <div className='form-group'>
                        <label htmlFor='comment'>Comment</label>
                        <textarea
                          className='form-control'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          row='3'
                          id='comment'
                        ></textarea>
                      </div>
                      <button type='submit' className='btn btn-primary'>
                        {productCreateReviewLoading && (
                          <span
                            className='spinner-border spinner-border-sm mr-2'
                            role='status'
                            aria-hidden='true'
                          ></span>
                        )}
                        Submit
                      </button>
                    </form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductPage;
