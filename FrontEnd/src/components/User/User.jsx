import React, { useEffect, useContext, useState } from 'react';
import './User.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Notification = ({ message, type }) => (
  <div className={`notification ${type}`}>
    {message}
  </div>
);

const User = () => {
  const {
    isLoggedIn,
    userId,
    fetchUserOrders,
    userOrders,
    userDetails,
    updateUser,
    logout
  } = useContext(StoreContext);
  const [editedUser, setEditedUser] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchUserOrders(userId);
    }
  }, [isLoggedIn, userId, navigate]);

  useEffect(() => {
    if (userDetails) {
      setEditedUser({ ...userDetails });
      if (userDetails.addresses && userDetails.addresses.length > 0) {
        setSelectedAddress(userDetails.addresses[0]);
      }
    }
  }, [userDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in selectedAddress) {
      setSelectedAddress((prevAddress) => ({
        ...prevAddress,
        [name]: value,
      }));
    } else {
      setEditedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleAddressChange = (e) => {
    const addressId = e.target.value;
    const address = editedUser.addresses.find((addr) => addr.id === parseInt(addressId));
    setSelectedAddress(address);
  };

  const handleRegisterOrUpdate = async () => {
    try {
      if (editedUser.id) {
        // Atualiza os detalhes do usuário
        await updateUserDetails(editedUser);
      } else {
        // Registra um novo usuário
        await registerUser(editedUser.name, editedUser.email, editedUser.password);
      }
      showNotification('Dados atualizados com sucesso!', 'success');
    } catch (error) {
      showNotification('Erro ao atualizar dados!', 'error');
    }
  };

  if (!isLoggedIn) {
    navigate('/');
  }

  return (
    <div className="user-profile">
      <div className="user-data">
        <div className="user-info-img">
          <img
            src={editedUser?.image ? `/assets/${editedUser.image}` : `${assets.profile_icon}`}
            alt="User"
            className="user-image"
          />
          <h2>Olá {editedUser?.name || 'Usuário'}</h2>
          <br />
        </div>
        <div className="user-info">
          {editedUser && (
            <>
              <h2>Informações</h2>
              <div className="user-info-start">
                <div className="flex-col class">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email || ''}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="flex-col class">
                  <label>Documento:</label>
                  <input
                    type="text"
                    name="document"
                    value={editedUser.document || ''}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="flex-col class">
                  <label>Telefone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={editedUser.phone || ''}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              <br />
              {isEditing ? (
                <button className="button-edit" onClick={handleRegisterOrUpdate}>
                  Salvar
                </button>
              ) : (
                <button className="button-edit" onClick={() => setIsEditing(true)}>
                  Editar
                </button>
              )}
              <br /><br />
              <h2>Endereço</h2>
              <div className="flex-col class">
                <label>Selecionar Endereço:</label>
                <select
                  value={selectedAddress?.id || ''}
                  onChange={handleAddressChange}
                  disabled={!isEditing}
                >
                  {editedUser.addresses && editedUser.addresses.length > 0 && editedUser.addresses.map((address) => (
                    <option key={address.id} value={address.id}>
                      {`${address.street}, ${address.number} - ${address.neighborhood}`}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div className="user-info-end">
                {['street', 'number', 'neighborhood', 'city', 'state', 'zipCode'].map((field) => (
                  <div className="flex-col class" key={field}>
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                    <input
                      type="text"
                      name={field}
                      value={selectedAddress?.[field] || ''}
                      readOnly={!isEditing}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="user-orders">
            <h2>Meus Pedidos</h2>
            <ul>
              {userOrders &&
                userOrders.map((order) => (
                  <li key={order.id}>
                    <h4>Pedido #{order.id}</h4>
                    <p>Status do Pedido: {order.orderStage}</p>
                    <p>Data: {order.orderDate}</p>
                    <p>Itens: {order.orderItems.length}</p>
                    <p>
                      Total: {order.total_price}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
          {notification.message && <Notification message={notification.message} type={notification.type} />}
        </div>
      </div>
    </div>
  );
};

export default User;
