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
  const { isLoggedIn, userId, fetchUserOrders, userOrders, userDetails, updateUser } = useContext(StoreContext);
  const [editedUser, setEditedUser] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchUserOrders(userId);
    }
  }, [isLoggedIn, userId, fetchUserOrders]);

  useEffect(() => {
    if (userDetails) {
      setEditedUser({
        ...userDetails,
        birthDate: formatDateToISO(userDetails.birthDate),
      });
    }
  }, [userDetails]);

  const formatDateToISO = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const formatDateToBR = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const updatedUser = {
        ...editedUser,
        birthDate: formatDateToBR(editedUser.birthDate),
      };
      await updateUser(updatedUser);
      showNotification('Alterado com sucesso!', 'success');
      setIsEditing(false);
    } catch (error) {
      showNotification('Erro ao alterar!', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  if (!isLoggedIn) {
    return <div>Por favor, faça login para ver seu perfil.</div>;
  }

  if (!editedUser) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="user-profile">
      <div className="user-data">
        <div className="user-info-img">
          <img
            src={editedUser.image ? `/assets/${editedUser.image}` : `${assets.profile_icon}`}
            alt="User"
            className="user-image"
          />
          <h2>Olá {editedUser.name || 'Usuário'}</h2>
        </div>
        <div className="user-info">
          <h2>Informações</h2>
          <div className="user-info-start">
            <div className="flex-col class">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editedUser.email || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex-col class">
              <label>Documento:</label>
              <input
                type="text"
                name="document"
                value={editedUser.document || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex-col class">
              <label>Telefone:</label>
              <input
                type="text"
                name="phone"
                value={editedUser.phone || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex-col class">
              <label>Data de Nascimento:</label>
              <input
                type="date"
                name="birthDate"
                value={editedUser.birthDate || ''}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
          </div>
          {isEditing ? (
            <button className="btn" onClick={handleSaveChanges}>
              Salvar
            </button>
          ) : (
            <button className="btn" onClick={() => setIsEditing(true)}>
              Editar
            </button>
          )}

          <h2>Endereço</h2>
          <div className="user-info-end">
            {['rua', 'numero', 'bairro', 'cidade', 'estado', 'cep', 'pais'].map((field) => (
              <div className="flex-col class" key={field}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                <input
                  type="text"
                  name={field}
                  value={editedUser.address ? JSON.parse(editedUser.address)[field] || '' : ''}
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>

        <div className="user-orders">
          <h2>Meus Pedidos</h2>
          <ul>
            {userOrders &&
              userOrders.map((order) => (
                <li key={order.id}>
                  <h4>Pedido #{order.id}</h4>
                  <p>Status do Pedido: {order.orderStage}</p>
                  <p>Data: {new Date(order.orderDate).toLocaleDateString()}</p>
                  <p>Itens: {order.orderItems.length}</p>
                  <p>
                    Total: {order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                  </p>
                </li>
              ))}
          </ul>
        </div>
        {notification.message && <Notification message={notification.message} type={notification.type} />}
      </div>
    </div>
  );
};

export default User;
