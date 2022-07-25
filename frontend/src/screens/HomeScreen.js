import {useEffect, useReducer} from "react";
import axios from 'axios'
import logger from 'use-reducer-logger'
import {Row, Col} from 'react-bootstrap'
import Product from "../components/Product";

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
    return (
        <div>
            <h1>
                Featured Products
            </h1>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div> {error}</div>
            ) : (<Row>
                {products.map(p => (
                    <Col  key={p.slug} sm={6} md={4} lg={2} className="mb-3">
                        <Product product={p}/>
                    </Col>)
                )}

            </Row>)}
        </div>)
}


export default HomeScreen