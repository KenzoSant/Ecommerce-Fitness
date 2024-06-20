import React, { useEffect, useContext, useState } from 'react';
import './User.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    registerOrUpdateUser,
    setUserDetails, // Use esta função para atualizar manualmente os dados do usuário
  } = useContext(StoreContext);
  const [editedUser, setEditedUser] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [lastAddressId, setLastAddressId] = useState(0);
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

  useEffect(() => {
    const fetchLastAddressId = async () => {
      try {
        const response = await axios.get('http://localhost:8080/addresses');
        const addresses = response.data;
        const maxId = addresses.reduce((max, address) => Math.max(max, address.id), 0);
        setLastAddressId(maxId);
      } catch (error) {
        console.error('Erro ao buscar o último ID de endereço:', error);
      }
    };

    fetchLastAddressId();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));

    setEditedUser((prevUser) => ({
      ...prevUser,
      addresses: prevUser.addresses.map((address) => 
        address.id === selectedAddress.id ? { ...selectedAddress, [name]: value } : address
      ),
    }));
  };

  const handleAddressChange = (e) => {
    const addressId = e.target.value;
    const address = editedUser.addresses.find((addr) => addr.id === parseInt(addressId));
    setSelectedAddress(address);
  };

  const handleAddAddress = () => {
    const newAddress = {
      id: lastAddressId + 1,
      zipCode: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      status: 'active',
    };
    setEditedUser((prevUser) => ({
      ...prevUser,
      addresses: [...prevUser.addresses, newAddress],
    }));
    setSelectedAddress(newAddress);
    setLastAddressId(lastAddressId + 1);
  };

  const handleSave = async () => {
    try {
      const updatedUserData = {
        id: editedUser.id,
        email: editedUser.email,
        name: editedUser.name,
        document: editedUser.document,
        phone: editedUser.phone,
        password: editedUser.password,
        status: editedUser.status,
        addresses: editedUser.addresses.map(address => ({
          id: address.id,
          zipCode: address.zipCode,
          state: address.state,
          city: address.city,
          neighborhood: address.neighborhood,
          street: address.street,
          number: address.number,
          status: address.status,
        }))
      };
      console.log("20",updatedUserData);
      await registerOrUpdateUser(updatedUserData);
      setNotification({ message: 'Dados atualizados com sucesso!', type: 'success' });
      setUserDetails(updatedUserData); // Atualiza manualmente os dados do usuário no contexto
    } catch (error) {
      setNotification({ message: 'Erro ao atualizar dados!', type: 'error' });
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
          <div>
            
            <button className="save-button" onClick={handleSave}>Salvar</button>
          </div>
          <br />
        </div>
        <div className="user-info">
          <h2>Informações</h2>
          <div className="user-info-start">
            <div className="flex-col class">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editedUser?.email || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex-col class">
              <label>Documento:</label>
              <input
                type="text"
                name="document"
                value={editedUser?.document || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex-col class">
              <label>Telefone:</label>
              <input
                type="text"
                name="phone"
                value={editedUser?.phone || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <br /><br />
          <h2>Endereço</h2>
          <div className="flex-col class">
            <label>Selecionar Endereço:</label>
            <select
              value={selectedAddress?.id || ''}
              onChange={handleAddressChange}
            >
              {editedUser?.addresses && editedUser?.addresses.length > 0 && editedUser?.addresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {`${address.street}, ${address.number} - ${address.neighborhood}`}
                </option>
              ))}
            </select>
            <button onClick={handleAddAddress}>Adicionar Endereço</button>
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
                  onChange={handleAddressInputChange}
                />
              </div>
            ))}
          </div>
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
