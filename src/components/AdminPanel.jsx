// src/components/AdminPanel.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KanbanBoard from './KanbanBoard';
import OrderDetailModal from './OrderDetailModal';
import { initialOrders } from '../data/mockData';
import { Button } from 'react-bootstrap';

const AdminPanel = ({ onLogout }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleGenerateReport = () => {
    navigate('/relatorio');
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center my-4">
        <div className="d-flex align-items-center">
          <img
            src="./src/assets/bom burguer.png"
            alt="Logo Bom Burguer"
            style={{ width: '80px', height: 'auto', marginRight: '15px' }}
          />
          <h1 className="m-0">Painel de Pedidos</h1>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        display: 'flex',
        gap: '10px'
      }}>
        <Button 
          variant="success"
          onClick={handleGenerateReport}
          style={{
            padding: '10px 20px',
            fontWeight: 'bold'
          }}
        >
          Gerar Relatório
        </Button>
        
        <Button 
          variant="danger" 
          onClick={onLogout}
          style={{
            padding: '10px 20px',
            fontWeight: 'bold'
          }}
        >
          Sair
        </Button>
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
