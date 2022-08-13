import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils.js';
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');

  const submitHandler = async (e) => {};

  return (
    <Container className="small-container">
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <h1 className="my-3">Contact Us</h1>
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
        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="phone"
            required
            onChange={(e) => setResume(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Form.Group className="mb-3" controlId="subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      onChange={(e) => setResume(e.target.value)}
                    />
                  </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Group className="mb-3" controlId="subject">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      onChange={(e) => setResume(e.target.value)}
                    />
                  </Form.Group>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Send Message</Button>
        </div>
      </Form>
    </Container>
  );
}
