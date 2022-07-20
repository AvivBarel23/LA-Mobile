import React,{useEffect,useState} from 'react'
import axios from "axios"

const singleProduct = ({match})=>{
    const [product ,setProduct]=useState({})

    useEffect(() => {
        const fetchProduct = async()=>{
            const {data} = await axios.get(`/api/product/${match.params.id}`)
            setProduct(data)
        }
        fetchProduct();
    },[])
}