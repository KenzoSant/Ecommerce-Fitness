import React, { useEffect, useContext } from 'react';
import './User.css';
import { StoreContext } from '../../context/StoreContext';
import {assets} from '../../assets/assets'

const User = () => {
  const { isLoggedIn, userId, fetchUserOrders, userOrders } = useContext(StoreContext);

  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchUserOrders(userId);
    }
  }, [isLoggedIn, userId, fetchUserOrders]);

  if (!isLoggedIn) {
    return <div>Por favor, faça login para ver seu perfil.</div>;
  }

  return (
    <div className="user-profile">
      {userOrders && userOrders.length > 0 && userOrders[0].client && (
        <>
          <div className="user-info-img">
            <img
              src={userOrders[0].client.image ? `src/assets/${userOrders[0].client.image}` : `${assets.profile_icon}`}
              alt="User"
              className="user-image"
            />
            <h2>Olá {userOrders[0].client.name}</h2>
          </div>
          <div className="user-info"> 
            <h2>Informações</h2>
            <p>Email: {userOrders[0].client.email}</p>
            <p>Documento: {userOrders[0].client.document}</p>
            <p>Telefone: {userOrders[0].client.phone}</p>
            <br />
            <h2>Endereço</h2>
            <div className="user-info-end">
              {userOrders[0].address && (
                <React.Fragment>
                  <p>Rua: {JSON.parse(userOrders[0].address).rua}</p>
                  <p>Número: {JSON.parse(userOrders[0].address).numero}</p>
                  <p>Bairro: {JSON.parse(userOrders[0].address).bairro}</p>
                  <p>Cidade: {JSON.parse(userOrders[0].address).cidade}</p>
                  <p>Estado: {JSON.parse(userOrders[0].address).estado}</p>
                  <p>CEP: {JSON.parse(userOrders[0].address).cep}</p>
                  <p>País: {JSON.parse(userOrders[0].address).pais}</p>
                </React.Fragment>
              )}
            </div>
          </div>
        </>
      )}
      <div className="user-orders">
        <h3>Meus Pedidos</h3>
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
    </div>
  );
};

export default User;
