import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import Message from "../../components/Message/Message";
import Spinner from "../../components/Spinner/Spinner";
import {
  listProductDetails,
  createProductReview,
} from "../../redux/products/productActions";
import { ProductActionTypes } from "../../redux/products/types";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    success: successReviewCreate,
    error: errorReviewCreate,
  } = useSelector((state) => state.productReviewCreate);

  // Fetch Current Product from backend
  useEffect(() => {
    if (successReviewCreate) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: ProductActionTypes.PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [successReviewCreate, dispatch, match]);

  const addToCartHandler = (e) => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const reviewCreateHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <React.Fragment>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Spinner></Spinner>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <React.Fragment>
          <div className="row">
            <div className="col-md-6">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid"
              />
            </div>
            <div className="col-md-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h3>{product.name}</h3>
                </li>
                <li className="list-group-item">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  ></Rating>
                </li>
                <li className="list-group-item">Price: ${product.price}</li>
                <li className="list-group-item">
                  Description: {product.description}
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <div className="card">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col">Price:</div>
                      <div className="col">
                        <strong>${product.price}</strong>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col">Status:</div>
                      <div className="col">
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </div>
                    </div>
                  </li>

                  {product.countInStock > 0 && (
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col">Qty:</div>
                        <div className="col">
                          <form>
                            <div className="form-group">
                              <select
                                value={qty}
                                onChange={(e) => setQty(+e.target.value)}
                                className="form-control"
                              >
                                {[...Array(product.countInStock)].map(
                                  (_, idx) => {
                                    return <option key={idx}>{idx + 1}</option>;
                                  }
                                )}
                              </select>
                            </div>
                          </form>
                        </div>
                      </div>
                    </li>
                  )}

                  <li className="list-group-item">
                    <button
                      disabled={product.countInStock === 0}
                      className="btn btn-primary btn-block"
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ul className="list-group list-group-flush">
                {product.reviews.map((review) => {
                  return (
                    <li key={review._id} className="list-group-item">
                      <strong>{review.name}</strong>
                      <Rating value={review.rating}></Rating>
                      <p>{review.createdAt.slice(0, 10)}</p>
                      <p>{review.comment}</p>
                    </li>
                  );
                })}
                <li className="list-group-item">
                  <h2>Write a Customer Review</h2>
                  {errorReviewCreate && (
                    <Message variant="danger">{errorReviewCreate}</Message>
                  )}
                  {userInfo ? (
                    <form onSubmit={reviewCreateHandler}>
                      <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <select
                          value={rating}
                          onChange={(e) => setRating(+e.target.value)}
                          className="form-control"
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          className="form-control"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  ) : (
                    <Message>
                      Please <Link to="/login">Login</Link> to write a review
                    </Message>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductScreen;
