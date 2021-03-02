import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message/Message";
import Spinner from "../../components/Spinner/Spinner";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../../redux/products/productActions";
import { ProductActionTypes } from "../../redux/products/types";

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const { products, error, loading } = useSelector(
    (state) => state.productList
  );

  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    error: errorDelete,
    success: successDelete,
    loading: loadingDelete,
  } = useSelector((state) => state.productDelete);

  const {
    success: successCreate,
    product: productCreate,
    error: errorCreate,
    loading: loadingCreate,
  } = useSelector((state) => state.productCreate);

  useEffect(() => {
    dispatch({ type: ProductActionTypes.PRODUCT_CREATE_RESET });
    if (!userInfo) {
      history.push("/login");
    }
    if (userInfo && !userInfo.isAdmin) {
      history.push("/");
    }
    if (successCreate) {
      history.push(`/admin/product/${productCreate._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [userInfo, history, successCreate, successDelete]);

  const deleteHandler = (productId) => {
    if (window.confirm("Are you sure")) {
      // Delete Product
      dispatch(deleteProduct(productId));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <React.Fragment>
      <div className="row align-items-center">
        <div className="col">
          <h1>Products</h1>
        </div>
        <div className="col text-right">
          <button
            onClick={createProductHandler}
            className="btn btn-primary my-3"
          >
            <i className="fas fa-plus"></i> Create Product
          </button>
        </div>
      </div>
      {loadingDelete && <Spinner></Spinner>}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Spinner></Spinner>}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Spinner></Spinner>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <table className="table table-hover table-sm table-striped table-bordered">
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
                      className="btn btn-sm btn-light"
                      to={`/admin/product/${product._id}/edit`}
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      onClick={() => deleteHandler(product._id)}
                      className="btn btn-sm btn-danger"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </React.Fragment>
  );
};

export default ProductListScreen;
