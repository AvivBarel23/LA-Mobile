import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import {Navbar, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


const App = () => {
    return (
        <BrowserRouter>
            <div className="d-flex flex-column site-container">
                <header>
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <LinkContainer to={"/"}>
                                <Navbar.Brand> LA-Mobile</Navbar.Brand>
                            </LinkContainer>
                        </Container>
                    </Navbar>
                </header>
                <main>
                    <Container>
                        <Routes>
                            <Route path="/products/slug/:slug" element={<ProductScreen/>}/>
                            <Route path="/" element={<HomeScreen/>}/>
                            <Route path="/products" element={<HomeScreen/>}/>
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

