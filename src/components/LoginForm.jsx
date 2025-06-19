// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { mockUsers } from '../data/mockData'; // Importar os dados mockados

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    ); //

    if (user) {
      onLoginSuccess(user);
    } else {
      setError('Nome de usuário ou senha inválidos.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <Card style={{ width: '24rem' }} className="shadow-lg p-3 mb-5 bg-white rounded">
        <Card.Body>
          <div className="text-center mb-4">
            <img
              src="./src/assets/bom burguer.png"
              alt="Logo Bom Burguer"
              style={{ width: '100px', height: 'auto' }}
              className="mb-3"
            />
            <Card.Title as="h2">Login</Card.Title>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Nome de Usuário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Entrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginForm;