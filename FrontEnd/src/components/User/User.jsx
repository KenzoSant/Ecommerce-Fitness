import React, { useEffect, useContext } from 'react';
import './User.css';
import { StoreContext } from '../../context/StoreContext';

const User = () => {
  const { isLoggedIn, userId, fetchUserOrders, userOrders } = useContext(StoreContext);

  useEffect(() => {
    // Verifica se o usuário está logado e tem um ID
    if (isLoggedIn && userId) {
      // Busca os pedidos do usuário
      fetchUserOrders(userId);
    }
  }, [isLoggedIn, userId, fetchUserOrders]);

  // Se o usuário não estiver logado, exibe uma mensagem
  if (!isLoggedIn) {
    return <div>Por favor, faça login para ver seu perfil.</div>;
  }

  // Verifica se há pedidos do usuário e renderiza as informações do perfil e os pedidos
  return (
    <div className="user-profile">
    {/* Verifica se userOrders está definido e não está vazio */}
    {userOrders && userOrders.length > 0 && userOrders[0].client && (
      <div className="user-info">
        {/* Renderiza os detalhes do usuário */}
        <img src={`src/assets/${userOrders[0].client.image}`} alt="User" className="user-image" />
        <h2>{userOrders[0].client.name}</h2>
        <p>Email: {userOrders[0].client.email}</p>
        <p>Documento: {userOrders[0].client.document}</p>
        <p>Telefone: {userOrders[0].client.phone}</p>
        <h3>Endereço</h3>
        <p>{JSON.parse(userOrders[0].client.address).rua}, {JSON.parse(userOrders[0].client.address).numero}</p>
        <p>{JSON.parse(userOrders[0].client.address).bairro}</p>
        <p>{JSON.parse(userOrders[0].client.address).cidade}, {JSON.parse(userOrders[0].client.address).estado}, {JSON.parse(userOrders[0].client.address).cep}</p>
        <p>{JSON.parse(userOrders[0].client.address).pais}</p>
      </div>
    )}
    <div className="user-orders">
      <h3>Meus Pedidos</h3>
      <ul>
        {/* Verifica se userOrders está definido */}
        {userOrders && userOrders.map(order => (
          <li key={order.id}>
            <h4>Pedido #{order.id}</h4>
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
