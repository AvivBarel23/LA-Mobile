import {useParams} from "react-router";
import {useEffect, useReducer} from "react";
import axios from 'axios'
import {ListGroup} from "react-bootstrap";
import Rating from "../components/Rating";
import {Row, Col} from 'react-bootstrap'


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, product: action.payload, loading: false};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state
    }
}


const ProductScreen = () => {
    const params = useParams();
    console.log('slug',params)
    const {slug} = params;

    const [{loading, error, product}, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            dispatch({type: 'FETCH_REQUEST'});
            try {
                const {data} = await axios.get(`/api/products/slug/${slug}`)
                dispatch({type: 'FETCH_SUCCESS', payload: data});
            } catch (err) {
                dispatch({type: 'FETCH_FAIL', payload: err.message});
            }
        }
        fetchProduct();
    }, [slug])


    return loading ? (
        <div>Loading...</div>
    ) : error ? (
        <div>{error}</div>
    ) : (
        <div>
            <Row>
                <Col md={6}>
                    <img src={product.image}
                    alt={product.name}/>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h1>{product.name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={product.rating} numReviews={product.numReviews}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        Price : ${product.price}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                </Col>
            </Row>
        </div>
    );


}
export default ProductScreen