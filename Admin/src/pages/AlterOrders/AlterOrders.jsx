import React, { useState } from 'react';
import Select from 'react-select';
import './AlterOrders.css';

const roleOptions = [
  { value: 'NOVO', label: 'NOVO' },
  { value: 'EM_PREPARO', label: 'EM PREPARO' },
  { value: 'EM_ROTA_DE_ENTREGA', label: 'EM ROTA DE ENTREGA' },
  { value: 'ENTREGUE', label: 'ENTREGUE' },
  { value: 'CANCELADO', label: 'CANCELADO' }
];

const AlterOrders = ({ order, onClose, onUpdate }) => {
  const [status, setStatus] = useState(order.status);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleUpdate = () => {
    onUpdate(order.id, status.value);
    setNotification({ message: 'Alterado com sucesso!', type: 'success' });
    setTimeout(() => setNotification({ message: '', type: '' }), 2000);
    setTimeout(() => onClose(), 2000);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '1.5px solid var(--second-color-green)',
      borderRadius: '10px',
    }),
  };

  return (
    <div className="screen">
      <div className="box">
        <h2>Edit Order</h2>
        <div className="list-info">
          <div className='flex-col class'>
            <h3>Client Information</h3>
            <p>Name: {order.client.name}</p>
            <p>Email: {order.client.email}</p>
            <p>Phone: {order.client.phone}</p>
            <p>Document: {order.client.document}</p>
          </div>
          <div className='flex-col class'>
            <h3>Employee Information</h3>
            <p>Name: {order.employee.name}</p>
            <p>Role: {order.employee.role}</p>
          </div>
          <div className='flex-col class'>
            <h3>Order Details</h3>
            <p>Date: {order.date}</p>
            <p>Item: {order.item}</p>
            <p>Price: {order.price}</p>
            <p>Calories: {order.kcal}</p>
            <p>Payment Type: {order.paymentType.name}</p>
            <p>Address: {order.address}</p>
          </div>
          <div className="flex-col class">
            <label>Status:</label>
            <Select
              value={roleOptions.find(option => option.value === status)}
              onChange={setStatus}
              options={roleOptions}
              styles={customStyles}
            />
          </div>
        </div>
        <div className="list-button">
          <button className="btn btn-list" onClick={handleUpdate}>Salvar</button>
          <button className="btn btn-list" onClick={onClose}>Fechar</button>
        </div>
        {notification.message && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}
      </div>
    </div>
  );
};

export default AlterOrders;
