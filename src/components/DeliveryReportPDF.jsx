import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    textAlign: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  table: {
    width: '100%',
    marginTop: 15,
    border: '1px solid #ddd'
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd'
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottom: '1px solid #eee'
  },
  cell: {
    flex: 1,
    fontSize: 10,
    paddingHorizontal: 5,
    textAlign: 'center'
  },
  totalSection: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: '1px solid #ddd',
    textAlign: 'right'
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 12
  }
});

const PdfDocument = ({ orders = [] }) => {
  const total = orders.reduce((sum, order) => sum + (order?.valorTotal || 0), 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Relatório de Pedidos</Text>
          <Text style={{ fontSize: 10 }}>Gerado em: {new Date().toLocaleDateString('pt-BR')}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.cell}>ID Pedido</Text>
            <Text style={styles.cell}>Data</Text>
            <Text style={styles.cell}>Cliente</Text>
            <Text style={styles.cell}>Entregador</Text>
            <Text style={styles.cell}>Status</Text>
            <Text style={styles.cell}>Valor (R$)</Text>
          </View>

          {orders.map((order, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cell}>{order.id || '-'}</Text>
              <Text style={styles.cell}>{order.dataPedido || '-'}</Text>
              <Text style={styles.cell}>{order.customerName || '-'}</Text>
              <Text style={styles.cell}>{order.deliveryPerson || '-'}</Text>
              <Text style={styles.cell}>{order.status || '-'}</Text>
              <Text style={styles.cell}>{order.valorTotal?.toFixed(2) || '0.00'}</Text>
            </View>
          ))}
        </View>

        {/* Seção de totais */}
        <View style={styles.totalSection}>
          <Text style={styles.totalText}>Total de Pedidos: {orders.length}</Text>
          <Text style={styles.totalText}>Valor Total: R$ {total.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
