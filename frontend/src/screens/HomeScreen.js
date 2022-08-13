import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import CarouselHomePage from '../components/CarouselHomePage';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomeScreen = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchProducts();
  }, []);

  const [{ products }, dispatch] = useReducer(reducer, {
    products: [],
  });

  return (
    <div>
      <Helmet>
        <title>LA-Mobile</title>
      </Helmet>
      <h1>Featured Products</h1>

      <CarouselHomePage
        products={Object.values(
          products.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
        ).slice(0, 3)}
      />
    </div>
  );
};

export default HomeScreen;
