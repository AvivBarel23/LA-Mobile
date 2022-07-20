import React from 'react'
import axios from 'axios'
import {useState} from "react";


const App = () => {
  const initialState = {
    term: '',
    coverage: '',
    age: '',
    weight: '',
    height: '',
    price: '',
    healthClass: '',
  }
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [formState, setFormState] = useState(initialState)
  const onChange = (event) => {
    if (wasSubmitted) {
      setFormState(initialState)
    }
    setWasSubmitted(false)
    const {id, value} = event.target
    setFormState(prev => ({...prev, [id]: value}))
  }

  const onSubmit = event => {
    setWasSubmitted(true)
    event.preventDefault();
    const {term, coverage, age, height, weight} = formState;
    axios.get(`/quote`, {
      params: {
        term, coverage, age, height, weight
      }
    })
        .then(data => {
          setFormState(prev => ({
            ...prev, price: data.data.price,
            healthClass: data.data.healthClass
          }))
        }).catch(e => console.log('error', e))
  }
  return (
      <div>
        <h1 className=" d-flex flex-row justify-content-around" style={{marginTop:'5%'}}>Sproutt Home Assignment </h1>
        <form className="mt-5 d-flex flex-row justify-content-around" onSubmit={onSubmit}>

          <label>
            Term:
            <input id="term" className="form-control" type="text" value={formState.term} onChange={onChange}/>
          </label>
          <label>
            Coverage:
            <input id="coverage" className="form-control" type="text" value={formState.coverage}
                   onChange={onChange}/>
          </label>
          <label>
            Age:
            <input id="age" className="form-control" type="text" value={formState.age} onChange={onChange}/>
          </label>
          <label>
            Height:
            <input id="height" className="form-control" type="text" value={formState.height}
                   onChange={onChange}/>
          </label>
          <label>
            Weight:
            <input id="weight" className="form-control" type="text" value={formState.weight}
                   onChange={onChange}/>
          </label>

          <input className="btn btn-outline-primary" type="submit" value="Submit"/>

        </form>

        {formState.price && formState.healthClass &&
        <div className="d-flex flex-column " style={{marginTop:'5%',marginLeft:'2%'}}>
          <h3>result:</h3>
          <div>
            {JSON.stringify({
              price: (parseFloat(formState.price)).toFixed(3),
              healthClass: formState.healthClass,
              term: formState.term,
              coverage: formState.coverage
            })}
          </div>
        </div>
        }
      </div>

  );

}

export default App

