import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import AboutScreen from './screens/AboutScreen';
import BranchesScreen from './screens/BranchesScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import StoreScreen from './screens/StoreScreen';
import SearchBox from './components/SearchBox';
import ProtectedRoute from './components/ProtectedRoute';
import CookieService from './CookieService';
import Axios from 'axios';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import UserListScreen from './screens/UserListScreen';
import UserActivityScreen from './screens/UserActivityScreen';
// import UserCartScreen from './screens/UserCartScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signOutHandler = async () => {
    await Axios.post('/api/users/signout', {
      userId: userInfo._id,
    });
    ctxDispatch({ type: 'USER_SIGNOUT' });
    CookieService.remove('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('cartItems');
    window.location.href = '/signin';
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>LA-Mobile</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <Link to="/search" className="nav-link">
                    Store
                  </Link>
                </Nav>
                <Nav>
                  <Link to="/branches" className="nav-link">
                    Branches
                  </Link>
                </Nav>
                <Nav>
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                </Nav>
                <Nav className="me-auto  w-100  justify-content-end">
                  <SearchBox />
                  <Link to="/cart" className="nav-link">
                    <i
                      className="fas fa-shopping-cart "
                      style={{ color: 'white', marginRight: '0.5rem' }}
                    />
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown
                      title={userInfo.username}
                      id="basic-nav-dropdown"
                      align="end"
                    >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="/signin"
                        onClick={signOutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin panel" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/products" element={<HomeScreen />} />
              <Route path="/search" element={<StoreScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/products/:slug" element={<ProductScreen />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/placeorder"
                element={
                  <ProtectedRoute>
                    <PlaceOrderScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/branches"
                element={
                  <ProtectedRoute>
                    <BranchesScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <AboutScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <ShippingAddressScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentMethodScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              />
              {/*<Route*/}
              {/*  path="/admin/cart/:id"*/}
              {/*  element={*/}
              {/*    <AdminRoute>*/}
              {/*      <UserCartScreen />*/}
              {/*    </AdminRoute>*/}
              {/*  }*/}
              {/*/>*/}

              <Route
                path="/admin/users/activityLogs/:id"
                element={
                  <AdminRoute>
                    <UserActivityScreen />
                  </AdminRoute>
                }
              />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">
            All rights reserved to Aviv Barel and Lior Levy Landman
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
