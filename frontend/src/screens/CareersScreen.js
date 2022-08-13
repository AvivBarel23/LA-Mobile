import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils.js';

export default function CareersScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');

  const submitHandler = async (e) => {};

  return (
    <Container className="small-container">
      <Helmet>
        <title>Careers</title>
      </Helmet>
      <h1 className="my-3">Come work with us !</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="name"
            required
            onChange={(e) => setEmail(e.target.value)}
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
          <Form.Label>Upload CV</Form.Label>
          <Form.Control
            type="file"
            required
            onChange={(e) => setResume(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Cover Letter</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setCoverLetter(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Apply</Button>
        </div>
      </Form>
    </Container>
  );
}
