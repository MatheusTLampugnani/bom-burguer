import React, { useState } from 'react';
import KanbanBoard from './KanbanBoard';
import { initialOrders } from '../data/mockData';

const AdminPanel = () => {
  const [orders, setOrders] = useState(initialOrders);

  return (
    <div>
      <h1 className="my-4 text-center">Painel de Pedidos - Hamburgueria</h1>
      <KanbanBoard orders={orders} />
    </div>
  );
};

export default AdminPanel;