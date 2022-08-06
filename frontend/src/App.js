import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CareersScreen from "./screens/CareersScreen";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import BranchesScreen from "./screens/BranchesScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/signin";
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>LA-Mobile</Navbar.Brand>
              </LinkContainer>
              <Nav>
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </Nav>
              <Nav>
                <Link to="/careers" className="nav-link">
                  Careers
                </Link>
              </Nav>
              <Nav>
                <Link to="/branches" className="nav-link">
                  Branches & hours
                </Link>
              </Nav>
              <Nav>
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </Nav>
              <Nav>
                <Link to="/cart" className="nav-link">
                  <i
                    className="fas fa-shopping-cart "
                    style={{ color: "white", marginRight: "0.5rem" }}
                  />
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/products/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/products" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/careers" element={<CareersScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/contact" element={<ContactScreen />} />
              <Route path="/branches" element={<BranchesScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
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
