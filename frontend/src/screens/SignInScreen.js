import {Container, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useLocation} from "react-router";
import {Helmet} from 'react-helmet-async'
import {Link} from "react-router-dom";

const SignInScreen = () => {
    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    return (
        <div>
            <Container className="small-container">
                <Helmet>
                    <title>Sign In</title>
                </Helmet>
                <h1 className="my-3">Sign In</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.label>
                            Email
                        </Form.label>
                        <Form.Control type="email" required/>

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.label>
                            Password
                        </Form.label>
                        <Form.Control type="password" required/>
                    </Form.Group>

                    <div className="mb-3">
                        <Button type="submit">Sign In</Button>
                    </div>

                    <div className="mb-3">
                        New Costumer ? {'  '}
                        <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default SignInScreen;