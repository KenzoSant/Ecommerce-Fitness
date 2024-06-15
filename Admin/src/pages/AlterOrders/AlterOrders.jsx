import React, { useState } from 'react';
import './AlterOrders.css';

const AlterOrders = ({ order, onClose, onUpdate }) => {
  const [status, setStatus] = useState(order.status);

  const handleUpdate = () => {
    onUpdate(order.id, status);
    onClose();
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
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="NOVO">NOVO</option>
            <option value="EM_PREPARO">EM PREPARO</option>
            <option value="EM_ROTA_DE_ENTREGA">EM ROTA DE ENTREGA</option>
            <option value="ENTREGUE">ENTREGUE</option>
            <option value="CANCELADO">CANCELADO</option>
          </select>
        </div>
        </div>
        
        <div className="list-button">
          <button className="btn btn-list" onClick={handleUpdate}>Update</button>
          <button className="btn btn-list" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AlterOrders;
