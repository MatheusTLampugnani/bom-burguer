// src/components/AdminPanel.jsx
import React, { useState } from 'react';
import KanbanBoard from './KanbanBoard';
import OrderDetailModal from './OrderDetailModal';
import { initialOrders } from '../data/mockData';
import { Button } from 'react-bootstrap';

const AdminPanel = ({ userRole, onLogout }) => {
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
      <div className="d-flex align-items-center justify-content-center my-4 position-relative">
        <div className="d-flex align-items-center">
          <img
            src="./src/assets/bom burguer.png" 
            alt="Logo Bom Burguer"
            style={{ width: '80px', height: 'auto', marginRight: '15px' }}
          />
          <h1 className="m-0">Painel de Pedidos</h1>
        </div>

        <div style={{ position: 'absolute', top: 0, right: 0, marginTop: '1rem', marginRight: '1rem' }}>
          <Button variant="danger" onClick={onLogout}>Sair</Button>
        </div>
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