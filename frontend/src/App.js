import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import {Navbar, Container, Nav, Badge} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useContext} from "react";
import {Store} from "./Store";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";


const App = () => {
    const {state} = useContext(Store);
    const {cart} = state;
    return (
        <BrowserRouter>
            <div className="d-flex flex-column site-container">
                <header>
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <LinkContainer to={"/"}>
                                <Navbar.Brand> LA-Mobile</Navbar.Brand>
                            </LinkContainer>
                            <Nav>
                                <Link to="/cart" className="nav-link">
                                    <i className="fas fa-shopping-cart "
                                       style={{color: "white", marginRight: '0.5rem'}}/>
                                    {
                                        cart.cartItems.length > 0 && (
                                            <Badge pill bg="danger">
                                                {cart.cartItems.reduce((a,c)=>a+c.quantity,0)}
                                            </Badge>
                                        )
                                    }
                                </Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </header>
                <main>
                    <Container className="mt-3">
                        <Routes>
                            <Route path="/products/:slug" element={<ProductScreen/>}/>
                            <Route path="/" element={<HomeScreen/>}/>
                            <Route path="/signin" element={<SignInScreen/>}/>
                            <Route path="/products" element={<HomeScreen/>}/>
                            <Route path="/cart" element={<CartScreen/>}/>
                        </Routes>
                    </Container>
                </main>
                <footer className="d-flex justify-content-center">
                    All rights reserved to Aviv Barel and Lior Levi Landman
                </footer>
            </div>
        </BrowserRouter>
    );

}

export default App

