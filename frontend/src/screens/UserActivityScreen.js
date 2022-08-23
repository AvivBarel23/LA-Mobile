import axios from 'axios';
import React, { useEffect, useReducer, useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import { useParams } from 'react-router';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, activityLogs: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function UserActivityScreen() {
  const [currentUser, setCurrentUser] = useState({});
  const params = useParams();
  const { id: userId } = params;
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, activityLogs }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `/api/users/admin/activityLogs?id=${userId}`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        const { data: currentUserData } = await axios.get(
          `/api/users/admin?userId=${userId}`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        setCurrentUser(currentUserData);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userId]);
  return (
    <div>
      <Helmet>
        <title>Activity Logs</title>
      </Helmet>

      <h1>Activity Logs - {currentUser.username}</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>TYPE OF ACTIVITY</th>
              <th>DATE</th>
              <th>TIME</th>
            </tr>
          </thead>
          <tbody>
            {activityLogs.map((log) => (
              <tr>
                <td>{log.type}</td>
                <td>{log.date}</td>
                <td>{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
