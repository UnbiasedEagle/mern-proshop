import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';
import {
  listProductDetails,
  updateProduct,
} from '../redux/product/productActions';
import { ProductActionTypes } from '../redux/product/types';
import axios from 'axios';

const ProductEditPage = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );

  const {
    error: productUpdateError,
    loading: productUpdateLoading,
    success: productUpdateSuccess,
  } = useSelector((state) => state.productUpdate);

  useEffect(() => {
    if (productUpdateSuccess) {
      dispatch({ type: ProductActionTypes.PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product || !product.name || productId !== product._id) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setBrand(product.brand);
        setImage(product.image);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [productId, dispatch, product, history, productUpdateSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: product._id,
        name,
        image,
        countInStock,
        description,
        brand,
        category,
        price: Number(price),
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append('image', file);

    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/uploads', formData, config);

      console.log(data);

      setImage(data);

      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <React.Fragment>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {productUpdateError && (
          <Message variant='danger'>{productUpdateError}</Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                placeholder='Enter name'
                className='form-control'
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='price'>Price</label>
              <input
                placeholder='Enter price'
                className='form-control'
                type='number'
                id='price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='image'>Image</label>
              <input
                placeholder='Enter image'
                className='form-control'
                type='text'
                id='image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <div className='input-group mt-2'>
                <div className='custom-file'>
                  <input
                    type='file'
                    className='custom-file-input'
                    name='image-file'
                    onChange={uploadFileHandler}
                  />
                  <label className='custom-file-label' htmlFor='image-file'>
                    Choose file
                  </label>
                </div>
              </div>
              {uploading && <Loader></Loader>}
            </div>
            <div className='form-group'>
              <label htmlFor='brand'>Brand</label>
              <input
                placeholder='Enter brand'
                className='form-control'
                type='text'
                id='brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='countInStock'>Count In Stock</label>
              <input
                placeholder='Enter count in stock'
                className='form-control'
                type='number'
                id='countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='category'>Category</label>
              <input
                placeholder='Enter category'
                className='form-control'
                type='text'
                id='category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <input
                placeholder='Enter description'
                className='form-control'
                type='text'
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button type='submit' className='btn btn-primary'>
              {productUpdateLoading && (
                <span
                  className='spinner-border spinner-border-sm mr-2'
                  role='status'
                  aria-hidden='true'
                ></span>
              )}
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default ProductEditPage;
