import React from 'react';
import { Modal, Button, ListGroup, Row, Col } from 'react-bootstrap';

const OrderDetailModal = ({ order, show, onHide }) => {
  if (!order) {
    return null;
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalhes do Pedido: {order.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <h5>Informações do Cliente</h5>
            <p><strong>Nome:</strong> {order.customerName}</p>
            <p><strong>Telefone:</strong> {order.telefone}</p>
            <p><strong>Endereço de Entrega:</strong></p>
            <address>
              {order.endereco.rua}, {order.endereco.numero}<br />
              {order.endereco.bairro} - {order.endereco.cidade}<br />
              CEP: {order.endereco.cep}
            </address>
          </Col>
          <Col md={6}>
            <h5>Detalhes da Compra</h5>
            <p><strong>Data do Pedido:</strong> {order.dataPedido}</p>
            <p><strong>Itens:</strong></p>
            <ListGroup variant="flush">
              {order.items.map((item, index) => (
                <ListGroup.Item key={index}>{item}</ListGroup.Item>
              ))}
            </ListGroup>
            <hr />
            <p><strong>Método de Pagamento:</strong> {order.metodoPagamento}</p>
            <h4 className="text-end">
              Valor Total: R$ {order.valorTotal.toFixed(2).replace('.', ',')}
            </h4>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailModal;