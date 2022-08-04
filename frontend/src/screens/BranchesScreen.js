import {useEffect, useReducer} from "react";
import axios from 'axios'
import logger from 'use-reducer-logger'
import {Row, Col} from 'react-bootstrap'
import {Helmet} from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Branch from "../components/Branch";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, branches: action.payload, loading: false};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state
    }
}


const HomeScreen = () => {
    useEffect(() => {
        const fetchBranches = async () => {
            dispatch({type: 'FETCH_REQUEST'});
            try {
                const {data} = await axios.get("/api/branches")
                dispatch({type: 'FETCH_SUCCESS', payload: data});
            } catch (err) {
                dispatch({type: 'FETCH_FAIL', payload: err.message});
            }

        }
        fetchBranches();
    }, [])

    const [{loading, error, branches}, dispatch] = useReducer(logger(reducer), {
        branches: [],
        loading: true,
        error: ''
    });

    return (
        <div>
            <Helmet>
                <title>Stores</title>
            </Helmet>
            <h1>
                Stores in Israel
            </h1>

            {loading ? (
                <LoadingBox/>
            ) : error ? (
                <MessageBox variant="danger"> {error}</MessageBox>
            ) : (
                <div>
                    <Row>
                        {branches.map(b => (
                            <Col key={b.slug} sm={6} md={4} lg={2} className="mb-3">
                                <Branch branch={b}/>
                            </Col>)
                        )}

                    </Row></div>)}
        </div>)
}


export default HomeScreen