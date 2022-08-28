import { createContext, useEffect, useReducer } from 'react';
import CookieService from './CookieService';
import axios from 'axios';

export const Store = createContext();
const initialState = {
  userInfo: CookieService.get('userInfo')
    ? CookieService.get('userInfo')
    : null,
  cart: {
    shippingAddress: {},
    paymentMethod: '',
    cartItems: [],
  },
  wasFetchedFromDb: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case 'USER_SIGNIN': {
      return { ...state, userInfo: action.payload };
    }
    case 'USER_SIGNOUT': {
      return {
        ...state,
        wasFetchedFromDb: false,
        userInfo: null,
      };
    }

    case 'SAVE_SHIPPING_ADDRESS': {
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    }

    case 'SAVE_PAYMENT_METHOD': {
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    }
    case 'INITIALIZE_CART': {
      return action.payload;
    }

    default:
      return state;
  }
}

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const userInfo = state?.userInfo;
  const flag = userInfo !== null && !state.wasFetchedFromDb;

  useEffect(() => {
    async function fetchData() {
      if (flag) {
        const { data } = await axios.get(
          `/api/cart?userId=${state.userInfo._id}`,
          {
            headers: { Authorization: `Bearer ${state.userInfo.token}` },
          }
        );
        if (data) {
          dispatch({
            type: 'INITIALIZE_CART',
            payload: {
              ...state,
              cart: {
                shippingAddress: localStorage.getItem('shippingAddress')
                  ? JSON.parse(localStorage.getItem('shippingAddress'))
                  : data?.cart.shippingAddress,
                paymentMethod: localStorage.getItem('paymentMethod')
                  ? localStorage.getItem('paymentMethod')
                  : data?.cart.paymentMethod,
                cartItems: localStorage.getItem('cartItems')
                  ? JSON.parse(localStorage.getItem('cartItems'))
                  : data?.cart.cartItems,
              },
              wasFetchedFromDb: true,
            },
          });
        }
      }
    }
    fetchData();
  }, [flag]);
  useEffect(() => {
    if (state.wasFetchedFromDb) {
      axios.put(
        `/api/cart`,
        { userId: state.userInfo._id, cart: state.cart },
        {
          headers: { Authorization: `Bearer ${state.userInfo.token}` },
        }
      );
    }
  }, [state]);

  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
