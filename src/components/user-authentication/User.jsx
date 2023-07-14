import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './UseStyle.css'

const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Logging in with email:', loginEmail, 'and password:', loginPassword);
  };

  return (
    <Container className="my-5">
  <Row className="justify-content-center align-items-center">
    <Col xs={12} md={6}>
      <Card>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="loginEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="loginPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>

  );
};

const RegistrationPage = () => {
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault();
    // Perform registration logic here
    console.log('Registering with email:', regEmail, 'and password:', regPassword);
  };

  return (
    <Container>
  <Row className="justify-content-center align-items-center">
    <Col xs={12} md={6}>
      <Card>
        <Card.Body>
          <h2 className="text-center">Registration</h2>
          <Form onSubmit={handleRegistration}>
            <Form.Group controlId="regEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="regPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="regConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 btn-custom">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
  );
};

const LoginRegistrationPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <div className="text-center">
                <img src="https://via.placeholder.com/150" alt="Logo" />
              </div>
              {showLogin ? <LoginPage /> : <RegistrationPage />}
              <div className="text-center mt-3">
                {showLogin ? (
                  <p>
                    Don't have an account?{' '}
                    <Button variant="link" onClick={handleToggle}>
                      Register here
                    </Button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <Button variant="link" onClick={handleToggle}>
                      Login here
                    </Button>
                  </p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginRegistrationPage;
