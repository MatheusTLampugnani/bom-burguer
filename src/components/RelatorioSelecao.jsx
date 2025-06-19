import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialOrders } from '../data/mockData';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import PdfDocument from './DeliveryReportPDF';

const RelatorioSelecao = () => {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({
    entregador: 'todos',
    status: 'todos',
    dataInicio: '',
    dataFim: ''
  });
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
  const [mostrarTabela, setMostrarTabela] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const parseDatePtBr = (dateString) => {
    if (!dateString) return null;
    try {
      const [datePart, timePart] = dateString.split(', ');
      const [day, month, year] = datePart.split('/');
      return new Date(`${year}-${month}-${day}T${timePart}`);
    } catch (error) {
      console.error('Erro ao converter data:', error);
      return null;
    }
  };

  useEffect(() => {
    setMostrarTabela(false);
  }, [filtros]);

  const aplicarFiltros = () => {
    setCarregando(true);

    try {
      let resultado = initialOrders.filter(order => {
        if (filtros.entregador !== 'todos' && order.deliveryPerson !== filtros.entregador) {
          return false;
        }

        if (filtros.status !== 'todos' && order.status !== filtros.status) {
          return false;
        }

        if (filtros.dataInicio || filtros.dataFim) {
          const dataPedido = parseDatePtBr(order.dataPedido);
          const inicio = filtros.dataInicio ? new Date(filtros.dataInicio + 'T00:00:00') : null;
          const fim = filtros.dataFim ? new Date(filtros.dataFim + 'T23:59:59') : null;

          if (!dataPedido) return false;
          if (inicio && dataPedido < inicio) return false;
          if (fim && dataPedido > fim) return false;
        }

        return true;
      });

      setPedidosFiltrados(resultado || []);
      setMostrarTabela(true);
    } catch (error) {
      console.error('Erro ao filtrar pedidos:', error);
      setPedidosFiltrados([]);
    } finally {
      setCarregando(false);
    }
  };

  const limparFiltros = () => {
    setFiltros({
      entregador: 'todos',
      status: 'todos',
      dataInicio: '',
      dataFim: ''
    });
    setPedidosFiltrados([]);
    setMostrarTabela(false);
  };

  const calcularTotal = () => {
    return pedidosFiltrados.reduce((total, pedido) => total + (pedido?.valorTotal || 0), 0);
  };

  const entregadores = ['todos', ...new Set(
    initialOrders
      .filter(order => order.deliveryPerson)
      .map(order => order.deliveryPerson)
  )];

  const statusOptions = ['todos', ...new Set(
    initialOrders.map(order => order.status)
  )];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Relatório de Pedidos</h2>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Filtros</h5>

          <Form>
            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Entregador</Form.Label>
                  <Form.Select
                    value={filtros.entregador}
                    onChange={(e) => setFiltros({ ...filtros, entregador: e.target.value })}
                    disabled={carregando}
                  >
                    {entregadores.map(entregador => (
                      <option key={entregador} value={entregador}>
                        {entregador === 'todos' ? 'Todos os Entregadores' : entregador}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={filtros.status}
                    onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
                    disabled={carregando}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {status === 'todos' ? 'Todos os Status' : status}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Data Início</Form.Label>
                  <Form.Control
                    type="date"
                    value={filtros.dataInicio}
                    onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
                    disabled={carregando}
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Data Fim</Form.Label>
                  <Form.Control
                    type="date"
                    value={filtros.dataFim}
                    onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
                    disabled={carregando}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2">
              <Button
                variant="primary"
                onClick={aplicarFiltros}
                disabled={carregando}
              >
                {carregando ? 'Filtrando...' : 'Aplicar Filtros'}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={limparFiltros}
                disabled={carregando}
              >
                Limpar Filtros
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {carregando && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      )}

      {mostrarTabela && !carregando && (
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title">Resultados</h5>
              {pedidosFiltrados.length > 0 && (
                <div className="mt-3">
                  <PDFDownloadLink
                    document={<PdfDocument orders={pedidosFiltrados} />}
                    fileName={`relatorio_pedidos_${new Date().toISOString().slice(0, 10)}.pdf`}
                    style={{ textDecoration: 'none' }}
                  >
                    {({ loading }) => (
                      <Button variant="success" disabled={loading}>
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Gerando PDF...
                          </>
                        ) : 'Exportar para PDF'}
                      </Button>
                    )}
                  </PDFDownloadLink>
                </div>
              )}

            </div>

            {pedidosFiltrados.length > 0 ? (
              <>
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID Pedido</th>
                        <th>Data</th>
                        <th>Cliente</th>
                        <th>Entregador</th>
                        <th>Status</th>
                        <th>Valor (R$)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedidosFiltrados.map((pedido, index) => (
                        <tr key={`${pedido.id}-${index}`}>
                          <td>{pedido.id}</td>
                          <td>{pedido.dataPedido}</td>
                          <td>{pedido.customerName}</td>
                          <td>{pedido.deliveryPerson || '-'}</td>
                          <td>{pedido.status}</td>
                          <td>{pedido.valorTotal.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                <div className="mt-3">
                  <h5>Total: R$ {calcularTotal().toFixed(2)}</h5>
                  <p>Total de pedidos: {pedidosFiltrados.length}</p>
                </div>
              </>
            ) : (
              <div className="alert alert-warning">
                Nenhum pedido encontrado com os filtros selecionados.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatorioSelecao;
