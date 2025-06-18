// src/components/KanbanColumn.jsx

import React from 'react';
import OrderCard from './OrderCard';
import { Col, Card } from 'react-bootstrap';

const KanbanColumn = ({ title, orders, color }) => {
  return (
    // Em telas médias (md) ou maiores, cada coluna ocupará 3 de 12 espaços (totalizando 4 colunas)
    <Col md={3}>
      <Card bg={color} text="white" className="mb-3 shadow-sm">
        <Card.Header as="h5" className="text-center text-capitalize">
          {title}
        </Card.Header>
      </Card>
      {orders.length > 0 ? (
        orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))
      ) : (
        <p className="text-center text-muted">Nenhum pedido aqui.</p>
      )}
    </Col>
  );
};

export default KanbanColumn;