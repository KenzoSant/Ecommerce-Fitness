import React, { useEffect, useContext, useState } from 'react';
import './User.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const Notification = ({ message, type }) => (
  <div className={`notification ${type}`}>
    {message}
  </div>
);

const User = () => {
  const { isLoggedIn, userDetails, fetchUserOrders, userOrders } = useContext(StoreContext);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    if (isLoggedIn && userDetails) {
      fetchUserOrders(userDetails.id);
    }
  }, [isLoggedIn, userDetails, fetchUserOrders]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  if (!isLoggedIn) {
    return <div>Por favor, faça login para ver seu perfil.</div>;
  }

  return (
    <div className="user-profile">
      <div className="user-data">
        <div className="user-info-img">
          <img
            src={userDetails?.image ? `src/assets/${userDetails.image}` : `${assets.profile_icon}`}
            alt="User"
            className="user-image"
          />
          <h2>Olá {userDetails?.name || 'Usuário'}</h2>
        </div>
        <div className="user-info">
          <h2>Informações</h2>
          <div className="user-info-start">
            <div className="flex-col class">
              <label>Email:</label>
              <input type="email" value={userDetails?.email || ''} readOnly />
            </div>
            <div className="flex-col class">
              <label>Documento:</label>
              <input type="text" value={userDetails?.document || ''} readOnly />
            </div>
            <div className="flex-col class">
              <label>Telefone:</label>
              <input type="text" value={userDetails?.phone || ''} readOnly />
            </div>
          </div>

          <br />

          <h2>Endereço</h2>
          <div className="user-info-end">
            {userDetails?.address ? (
              <>
                <div className="flex-col class">
                  <label>Rua:</label>
                  <input type="text" value={JSON.parse(userDetails.address).rua} readOnly />
                </div>
                <div className="flex-col class">
                  <label>Número:</label>
                  <input type="text" value={JSON.parse(userDetails.address).numero} readOnly />
                </div>
                <div className="flex-col class">
                  <label>Bairro:</label>
                  <input type="text" value={JSON.parse(userDetails.address).bairro} readOnly />
                </div>
                <div className="flex-col class">
                  <label>Cidade:</label>
                  <input type="text" value={JSON.parse(userDetails.address).cidade} readOnly />
                </div>
                <div className="flex-col class">
                  <label>Estado:</label>
                  <input type="text" value={JSON.parse(userDetails.address).estado} readOnly />
                </div>
                <div className="flex-col class">
                  <label>CEP:</label>
                  <input type="text" value={JSON.parse(userDetails.address).cep} readOnly />
                </div>
                <div className="flex-col class">
                  <label>País:</label>
                  <input type="text" value={JSON.parse(userDetails.address).pais} readOnly />
                </div>
              </>
            ) : (
              <>
                <div className="flex-col class">
                  <label>Rua:</label>
                  <input type="text" value="" readOnly />
                </div>
                <div className="flex-col class">
                  <label>Número:</label>
                  <input type="text" value="" readOnly />
                </div>
                <div className="flex-col class">
                  <label>Bairro:</label>
                  <input type="text" value="" readOnly />
                </div>
                <div className="flex-col class">
                  <label>Cidade:</label>
                  <input type="text" value="" readOnly />
                </div>
                <div className="flex-col class">
                  <label>Estado:</label>
                  <input type="text" value="" readOnly />
                </div>
                <div className="flex-col class">
                  <label>CEP:</label>
                  <input type="text" value="" readOnly />
                </div>
                <div className="flex-col class">
                  <label>País:</label>
                  <input type="text" value="" readOnly />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="user-orders">
          <h2>Meus Pedidos</h2>
          <ul>
            {userOrders && userOrders.map(order => (
              <li key={order.id}>
                <h4>Pedido #{order.id}</h4>
                <p>Status do Pedido: {order.orderStage}</p>
                <p>Data: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p>Itens: {order.orderItems.length}</p>
                <p>Total: {order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
              </li>
            ))}
          </ul>
        </div>
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
      </div>
    </div>
  );
};

export default User;
