import React, {useEffect, useState} from 'react'
import axios from 'axios'


const App = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async()=>{
            const {data} = await axios.get("/api/products")
            setProducts(data)
        }
        fetchProducts();
    },[])
    // const [wasSubmitted, setWasSubmitted] = useState(false)
    // const [formState, setFormState] = useState(initialState)
    // const onChange = (event) => {
    //   if (wasSubmitted) {
    //     setFormState(initialState)
    //   }
    //   setWasSubmitted(false)
    //   const {id, value} = event.target
    //   setFormState(prev => ({...prev, [id]: value}))
    // }
    //
    // const onSubmit = event => {
    //   setWasSubmitted(true)
    //   event.preventDefault();
    //   const {term, coverage, age, height, weight} = formState;
    //   axios.get(`/quote`, {
    //     params: {
    //       term, coverage, age, height, weight
    //     }
    //   })
    //       .then(data => {
    //         setFormState(prev => ({
    //           ...prev, price: data.data.price,
    //           healthClass: data.data.healthClass
    //         }))
    //       }).catch(e => console.log('error', e))
    // }
    return (
        <div>

        </div>

    );

}

export default App

