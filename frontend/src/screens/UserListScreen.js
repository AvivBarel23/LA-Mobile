import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export default function UserListScreen() {
  const [{ loading, error, users }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/users`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  const [searchResults, setSearchResults] = useState([]);
  const [noResultsWereFound, setNoResultsWereFound] = useState(false);

  useEffect(() => {
    if (users) {
      setSearchResults(users);
    }
  }, [users]);

  const handleChange = (e) => {
    const { value } = e.target;
    if (value === '') {
      setNoResultsWereFound(false);
      setSearchResults(users);
      return;
    }
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().startsWith(value)
    );
    if (filteredUsers.length === 0) {
      setNoResultsWereFound(true);
    } else {
      setNoResultsWereFound(false);
    }
    setSearchResults(filteredUsers);
  };

  return (
    <div>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <h1>Users</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <input
            className="search"
            onChange={handleChange}
            type="text"
            name="searchUser"
            placeholder="Type a username..."
          />
          <table className="table">
            <thead>
              <tr>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th>IS ADMIN</th>
                <th>VIEW</th>
              </tr>
            </thead>
            <tbody>
              {noResultsWereFound && <div>No such users!</div>}
              {!noResultsWereFound &&
                searchResults.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                    <td>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() =>
                          navigate(`/admin/user/logins/${user._id}`)
                        }
                      >
                        Logins
                      </Button>
                      &nbsp;
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => navigate(`/admin/user/cart/${user._id}`)}
                      >
                        Cart
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
