import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message/Message";
import Spinner from "../../components/Spinner/Spinner";
import { deleteUser, listUsers } from "../../redux/users/userActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { users, error, loading } = useSelector((state) => state.userList);

  const { success: successDelete } = useSelector((state) => state.userDelete);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (userInfo && !userInfo.isAdmin) {
      history.push("/");
    }
  }, [userInfo, history]);

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, successDelete]);

  const deleteHandler = (userId) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <React.Fragment>
      <h1>Users</h1>
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
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <Link
                      className="btn btn-sm btn-light"
                      to={`/admin/user/${user._id}/edit`}
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      onClick={() => deleteHandler(user._id)}
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

export default UserListScreen;
