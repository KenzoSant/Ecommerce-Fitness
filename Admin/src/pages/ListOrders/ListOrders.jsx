import React, { useContext, useState, useEffect } from 'react';
import './ListOrders.css';
import { AdmContext } from '../../context/AdmContext';
import AlterOrders from '../AlterOrders/AlterOrders';

const ListOrders = () => {
  const { orders, fetchOrders, updateOrderStatus } = useContext(AdmContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const itemsPerPage = 6;

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = (orders || []).filter(order =>
    order.id && order.id.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handleEditClick = (order) => {
    setSelectedOrder(order);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'NOVO':
        return 'blue';
      case 'EM_PREPARO':
        return 'orange';
      case 'EM_ROTA_DE_ENTREGA':
        return 'purple';
      case 'ENTREGUE':
        return 'green';
      case 'CANCELADO':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="list">
      <h1>Orders</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for an order by ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="container-list">
        <ul className="order-list">
          {currentOrders.map((order) => (
            <li key={order.id} className="order-item">
              <div className="order-card">
                <div className="order-details">
                  <h3>Pedido: {order.id}</h3>
                  <p>{order.client.name}</p>
                  <p> <span className="order-status" style={{ color: getStatusColor(order.orderStage) }}>{order.orderStage}</span></p>
                </div>
                <div className="principal">
                  <button className="btn" onClick={() => handleEditClick(order)}>Editar</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedOrder && (
        <AlterOrders
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdate={updateOrderStatus}
        />
      )}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`btn ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListOrders;
