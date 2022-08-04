import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { useContext, useReducer, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../util.js";

const reducer = (state,action)=>{
    switch(action.type){
        case 'UPDATE_REQUEST':
            return {...state,loadingUpdate:true};
        case 'UPDATE_SUCCESS':
            return {...state,loadingUpdate:false};
        case 'UPDATE_FAIL':
            return {...state,loadingUpdate:false};
        default:
            return {...state,loadingUpdate:true};
    }
}
export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    if(password!==confirmPassword){
        toast.error('Passwords do not match');
        return;
    }
    try {
        const { data } = await Axios.put("/api/users/profile", {
            name,
            email,
            password,
        },{headers:{Authorization:`Bearer ${userInfo.token}`}});
        ctxDispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        toast.success('user updated successfully')
    } catch (err) {
        dispatch({ type: "UPDATE_FAIL"});
        toast.error(getError(err));
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Update</Button>
        </div>
      </Form>
    </Container>
  );
}
