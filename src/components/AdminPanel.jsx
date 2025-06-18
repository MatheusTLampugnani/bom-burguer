import React, { useState } from 'react';
import KanbanBoard from './KanbanBoard';
import OrderDetailModal from './OrderDetailModal';
import { initialOrders } from '../data/mockData';

const AdminPanel = () => {
  const [orders, setOrders] = useState(initialOrders);

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center my-4 gap-3">
        <img 
          src="./src/assets/bom burguer.png" 
          alt="Logo Bom Burguer" 
          style={{ width: '80px', height: 'auto' }} 
        />
        <h1 className="m-0">Painel de Pedidos</h1>
      </div>

      <KanbanBoard orders={orders} onCardClick={handleShowModal} />

      <OrderDetailModal 
        show={showModal} 
        onHide={handleCloseModal} 
        order={selectedOrder} 
      />
    </div>
  );
};

export default AdminPanel;