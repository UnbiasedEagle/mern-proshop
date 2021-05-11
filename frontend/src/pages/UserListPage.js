import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../redux/user/userActions';

const UserListPage = ({ history }) => {
  const dispatch = useDispatch();

  const { error, loading, users } = useSelector((state) => state.userList);
  const { userInfo } = useSelector((state) => state.userLogin);

  const { success } = useSelector((state) => state.productDelete);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, success]);

  const deleteHandler = (userId) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <Fragment>
      <h1>Users</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <table className='table table-striped table-hover table-bordered table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{
                          color: 'green',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      ></i>
                    ) : (
                      <i
                        className='fas fa-times'
                        style={{
                          color: 'red',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <Link
                      className='btn btn-light btn-sm'
                      to={`/admin/user/${user._id}/edit`}
                    >
                      <i className='fas fa-edit'></i>
                    </Link>
                    <button
                      className='btn btn-sm btn-danger'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

export default UserListPage;
