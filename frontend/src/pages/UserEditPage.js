import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';
import { getUserDetails, updateUser } from '../redux/user/userActions';
import { UserActionTypes } from '../redux/user/types';

const UserEditPage = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const { user, error, loading } = useSelector((state) => state.userDetails);

  const {
    success,
    error: userUpdateError,
    loading: userUpdateLoading,
  } = useSelector((state) => state.userUpdate);

  useEffect(() => {
    if (success) {
      dispatch({ type: UserActionTypes.USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user || !user.name || userId !== user._id) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [userId, dispatch, user, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
  };

  return (
    <React.Fragment>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {userUpdateError && (
          <Message variant='danger'>{userUpdateError}</Message>
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
              <label htmlFor='email'>Email Address</label>
              <input
                placeholder='Enter email'
                className='form-control'
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  id='isAdmin'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  type='checkbox'
                />
                <label className='form-check-label' htmlFor='isAdmin'>
                  Is Admin
                </label>
              </div>
            </div>

            <button type='submit' className='btn btn-primary'>
              {userUpdateLoading && (
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

export default UserEditPage;
