import {useEffect, useReducer, useState} from "react";
import axios from 'axios'
import logger from 'use-reducer-logger'
import {Row, Col} from 'react-bootstrap'
import Product from "../components/Product";
import {Helmet} from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import CarouselHomePage from "../components/CarouselHomePage";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, products: action.payload, loading: false};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state
    }
}


const HomeScreen = () => {
    useEffect(() => {
        const fetchProducts = async () => {
            dispatch({type: 'FETCH_REQUEST'});
            try {
                const {data} = await axios.get("/api/products")
                dispatch({type: 'FETCH_SUCCESS', payload: data});
            } catch (err) {
                dispatch({type: 'FETCH_FAIL', payload: err.message});
            }

        }
        fetchProducts();
    }, [])

    const [{loading, error, products}, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: ''
    });

    const [searchResults, setSearchResults] = useState([]);
    const [noResultsWereFound, setNoResultsWereFound] = useState(false);

    const handleChange = (e) => {
        const {value} = e.target
        if (value === "") {
            setSearchResults([]);
            return;
        }
        const filteredProducts = products.filter(p => p.name.toLowerCase().includes(value) || p.description.toLowerCase().includes(value));
        if (filteredProducts.length === 0) {
            setNoResultsWereFound(true)
        } else {
            setNoResultsWereFound(false)
        }
        setSearchResults(filteredProducts);
    }

    return (
        <div>
            <Helmet>
                <title>LA-Mobile</title>
            </Helmet>
            <h1>
                Featured Products
            </h1>
            <CarouselHomePage
                products={Object.values(products.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))).slice(0, 3)}/>
            {loading ? (
                <LoadingBox/>
            ) : error ? (
                <MessageBox variant="danger"> {error}</MessageBox>
            ) : (
                <div>
                    <Row sm={10}>
                        <input className='search' onChange={handleChange} type='text' name='search'
                               placeholder='Search for an item...'/>
                    </Row>

                    <Row>
                        {noResultsWereFound && <div>No results were found</div>}
                        {!noResultsWereFound && searchResults.map(p => (
                            <Col key={p.slug} sm={6} md={4} lg={2} className="mb-3">
                                <Product product={p}/>
                            </Col>)
                        )}

                    </Row></div>)}
        </div>)
}


export default HomeScreen