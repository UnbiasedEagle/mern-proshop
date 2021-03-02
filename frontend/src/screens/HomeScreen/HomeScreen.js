import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/Product/Product";
import Spinner from "../../components/Spinner/Spinner";
import Message from "../../components/Message/Message";
import { listProducts } from "../../redux/products/productActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.productList
  );

  // Fetch Products from backend
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [keyword]);

  return (
    <React.Fragment>
      <h1>Latest Products</h1>
      {loading ? (
        <Spinner></Spinner>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="row">
          {products.map((product) => {
            return (
              <div
                key={product._id}
                className="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex align-items-stretch"
              >
                <Product product={product}></Product>
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default HomeScreen;
