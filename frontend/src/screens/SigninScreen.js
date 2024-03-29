import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils.js';
import CookieService from '../CookieService';

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMeValue, setRememberMeValue] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const tenDaysInMinutes = 60 * 24 * 10;
      const thirtyMinutesInMinutes = 30;
      const expiresAt =
        (rememberMeValue ? tenDaysInMinutes : thirtyMinutesInMinutes) *
        60 *
        1000;
      const { data } = await Axios.post('/api/users/signin', {
        username,
        password,
      });
      const date = new Date();
      date.setTime(date.getTime() + expiresAt);
      const options = { path: '/', expires: date };
      CookieService.set('userInfo', JSON.stringify(data), options);
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (CookieService.get('userInfo')) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex">
          <Form.Check
            id="remember-me"
            type="checkbox"
            onClick={(e) => {
              setRememberMeValue(e.target.checked);
            }}
          />
          <label className="mx-2" htmlFor="remember-me">
            Remember me
          </label>
        </Form.Group>

        <div className="mb-3 ">
          <Button type="submit">Sign In</Button>
        </div>

        <div className="mb-3">
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}
