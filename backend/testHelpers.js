import { fetchData, fetchWithGet } from './fetchHelper';

export const connectAsUser = async (username, password) => {
  return await fetchData(
    'http://localhost:5000/api/users/signin',
    {
      username,
      password,
    },
    'POST'
  );
};

export const signUpAsUser = async (username, email, password) => {
  return await fetchData(
    'http://localhost:5000/api/users/signup',
    {
      username,
      email,
      password,
    },
    'POST'
  );
};

export const changePassword = async (username, email, password, headers) => {
  return await fetchData(
    'http://localhost:5000/api/users/profile',
    {
      username,
      email,
      password,
    },
    'PUT',
    headers
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
  await fetchData(
    `http://localhost:5000/api/cart`,
    { userId: user._id, cart: cart },
    'PUT',
    {
      Authorization: `Bearer ${user.token}`,
    }
  );
};

export const getUserCart = async (url, user) => {
  return await fetchWithGet(url, {
    Authorization: `Bearer ${user.token}`,
  });
};
export const getUserCartItemsAsAdmin = async (url, user) => {
  return await fetchWithGet(url, {
    Authorization: `Bearer ${user.token}`,
  });
};

export const getProductByName = async (url, user) => {
  return await fetchWithGet(url, {
    Authorization: `Bearer ${user.token}`,
  });
};

export const addProduct = async (user) => {
  return await fetchData('http://localhost:5000/api/products', {}, 'POST', {
    Authorization: `Bearer ${user.token}`,
  });
};

export const updateProduct = async (url, data, user) => {
  return await fetchData(url, data, 'PUT', {
    'Content-Type': 'multipart/form-data',
    authorization: `Bearer ${user.token}`,
  });
};

export const deleteProduct = async (url, user) => {
  return await fetchData(url, {
    Authorization: `Bearer ${user.token}`,
  });
};

export const getRandomSuffix = () => Math.floor(Math.random() * 10000000000);
