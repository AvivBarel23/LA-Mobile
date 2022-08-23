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
      return { ...state, cartItems: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function UserCartScreen() {
  const [currentUserName, setCurrentUserName] = useState('');
  const params = useParams();
  const { id: userId } = params;
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, cartItems }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        debugger;
        const { data } = await axios.get(
          `/api/cart/admin/cartItems?userId=${userId}`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        const currentUserData = await axios.get(
          `/api/users/admin?userId=${userId}`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        setCurrentUserName(currentUserData.data.username);
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
        <title>User Cart</title>
      </Helmet>

      <h1>User Cart - {currentUserName}</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>AMOUNT</th>
                <th>PRICE</th>
                <th>IMAGE</th>
              </tr>
            </thead>
            <tbody>
              {!cartItems ? (
                <div>no items in cart</div>
              ) : (
                cartItems.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price * product.quantity}</td>
                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-thumbnail"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <h3>
            Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) : $
            {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
          </h3>
        </div>
      )}
    </div>
  );
}
