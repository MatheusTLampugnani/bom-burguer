export const initialOrders = [
  {
    id: '#A101',
    customerName: 'Carlos Silva',
    items: ['1x X-Tudo', '1x Batata Frita G', '1x Refrigerante Lata'],
    status: 'Pendente',
    store: 'Loja Centro',
    deliveryPerson: null,
    valorTotal: 45.50,
    dataPedido: new Date(2025, 5, 18, 19, 10, 2).toLocaleString('pt-BR'), // Mês 5 = Junho
    telefone: '(11) 98765-4321',
    metodoPagamento: 'Cartão de Crédito via App',
    endereco: {
      rua: 'Rua das Flores',
      numero: '123',
      bairro: 'Jardim Primavera',
      cidade: 'São Paulo',
      cep: '01234-567',
    }
  },
  {
    id: '#B201',
    customerName: 'João Pereira',
    items: ['2x X-Bacon', '1x Batata Frita P'],
    status: 'Em Preparo',
    store: 'Loja Centro',
    deliveryPerson: null,
    valorTotal: 55.00,
    dataPedido: new Date(2025, 5, 18, 19, 15, 40).toLocaleString('pt-BR'),
    telefone: '(21) 91234-5678',
    metodoPagamento: 'PIX',
    endereco: {
      rua: 'Avenida Central',
      numero: '456',
      bairro: 'Centro',
      cidade: 'Rio de Janeiro',
      cep: '20000-000',
    }
  },
  {
    id: '#C301',
    customerName: 'Ricardo Souza',
    items: ['1x Duplo Burger', '1x Milkshake'],
    status: 'Em Rota',
    store: 'Loja Centro',
    deliveryPerson: 'Marcos Andrade',
    valorTotal: 42.75,
    dataPedido: new Date(2025, 5, 18, 19, 20, 11).toLocaleString('pt-BR'),
    telefone: '(31) 98888-7777',
    metodoPagamento: 'Dinheiro',
    endereco: {
      rua: 'Rua dos Inconfidentes',
      numero: '789',
      bairro: 'Savassi',
      cidade: 'Belo Horizonte',
      cep: '30140-120',
    }
  },
  {
    id: '#D401',
    customerName: 'Fernanda Lima',
    items: ['1x X-Salada', '1x Batata Frita M'],
    status: 'Entregue',
    store: 'Loja Shopping',
    deliveryPerson: 'Lúcia Martins',
    valorTotal: 35.00,
    dataPedido: new Date(2025, 5, 18, 18, 50, 55).toLocaleString('pt-BR'),
    telefone: '(48) 99999-0000',
    metodoPagamento: 'Cartão de Débito',
    endereco: {
      rua: 'Beira Mar Norte',
      numero: '1000',
      bairro: 'Agronômica',
      cidade: 'Florianópolis',
      cep: '88025-000',
    }
  },
];