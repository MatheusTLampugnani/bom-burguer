// src/components/KanbanBoard.jsx

import React from 'react';
import { Container, Row } from 'react-bootstrap';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ orders }) => {
  const statuses = ['Pendente', 'Em Preparo', 'Em Rota', 'Entregue'];
  const columnColors = ['secondary', 'primary', 'info', 'success'];

  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  return (
    <Container fluid className="px-4">
      <Row>
        {statuses.map((status, index) => (
          <KanbanColumn
            key={status}
            title={status}
            orders={getOrdersByStatus(status)}
            color={columnColors[index]}
          />
        ))}
      </Row>
    </Container>
  );
};

export default KanbanBoard;