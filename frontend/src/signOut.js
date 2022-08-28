import Axios from 'axios';
import CookieService from './CookieService';

export const signOut = async (userInfo, ctxDispatch) => {
  await Axios.post(
    '/api/users/signout',
    {
      userId: userInfo._id,
    },
    {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
  );
  ctxDispatch({ type: 'USER_SIGNOUT' });
  CookieService.remove('userInfo');
  localStorage.removeItem('shippingAddress');
  localStorage.removeItem('paymentMethod');
  localStorage.removeItem('cartItems');
  window.location.href = '/signin';
};
