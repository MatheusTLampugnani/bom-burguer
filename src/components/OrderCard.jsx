// src/components/OrderCard.jsx

import React from 'react';
import { Card, Badge, ListGroup } from 'react-bootstrap';

const OrderCard = ({ order }) => {
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Pendente':
        return 'danger';
      case 'Em Preparo':
        return 'warning';
      case 'Em Rota':
        return 'info';
      case 'Entregue':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center fw-bold">
        <span>{order.id}</span>
        <Badge pill bg={getStatusBadgeVariant(order.status)} text="dark">
          {order.status}
        </Badge>
      </Card.Header>
      <Card.Body>
        <Card.Title>{order.customerName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Itens do Pedido:</Card.Subtitle>
        <ListGroup variant="flush">
          {order.items.map((item, index) => (
            <ListGroup.Item key={index} className="px-0 py-1">
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
      <Card.Footer className="text-muted d-flex justify-content-between small">
        <span>Loja: {order.store}</span>
        {order.deliveryPerson && (
          <span className="fw-bold">Entregador: {order.deliveryPerson}</span>
        )}
      </Card.Footer>
    </Card>
  );
};

export default OrderCard;