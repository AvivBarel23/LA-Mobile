import { fetchData } from './fetch';
import { findOne } from './persist';
import Product from './models/productModel';
import User from './models/userModel';

export const connectAsUser = async (username, password) => {
  return await fetchData(
    '/api/users/signin',
    {
      username,
      password,
    },
    'POST',
    {}
  );
};

export const signUpAsUser = async (username, email, password) => {
  return await fetchData(
    '/api/users/signup',
    {
      username,
      email,
      password,
    },
    'POST',
    {}
  );
};

export const changePassword = async (username, email, password) => {
  return await fetchData(
    '/api/users/profile',
    {
      username,
      email,
      password,
    },
    'POST',
    {}
  );
};

export const checkEqualityOfArrays = (arr1, arr2) => {
  expect(arr1).toEqual(expect.arrayContaining(arr2));
};
export const updateCart = async (user, products) => {
  const cart = {
    shippingAddress: {},
    paymentMethod: '',
    cartItems: products,
  };
  await fetchData(`/api/cart`, { userId: user._id, cart }, 'PUT', {
    Authorization: `Bearer ${user.token}`,
  });
};
