import React, { useContext, useState, useEffect } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItemList, userDetails, clearCart } = useContext(StoreContext);
  const [address, setAddress] = useState({
    street: '',
    number: '',
    neighborhood: '',
    zipCode: '',
    city: '',
    state: '',
    country: 'Brasil'
  });
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails && userDetails.addresses && userDetails.addresses.length > 0) {
      const { street, number, neighborhood, zipCode, city, state } = userDetails.addresses[0];
      setAddress({ street, number, neighborhood, zipCode, city, state, country: 'Brasil' });
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const isAddressComplete = () => {
    const { street, number, neighborhood, zipCode, city, state } = address;
    return street && number && neighborhood && zipCode && city && state;
  };

  const handlePayment = async () => {
    if (!isAddressComplete()) {
      setNotification({ message: 'Por favor, preencha todos os campos do endereço.', type: 'error' });
      setTimeout(() => setNotification({ message: '', type: '' }), 2000);
      return;
    }

    const orderItems = cartItemList.map(item => ({
      food: { id: item.id },
      quantity: item.quantity,
    }));

    const addressString = JSON.stringify({
      rua: address.street,
      numero: address.number,
      bairro: address.neighborhood,
      cidade: address.city,
      estado: address.state,
      cep: address.zipCode,
      pais: address.country
    });

    const orderData = {
      client: { id: userDetails.id },
      employee: { id: 1 },
      paymentType: { id: 1 },
      orderItems,
      address: addressString,
    };

    try {
      const response = await axios.post('http://localhost:8080/orders', orderData);
      setNotification({ message: 'Pedido efetuado com sucesso!', type: 'success' });
      clearCart();
      setTimeout(() => {setNotification({ message: '', type: '' });}, 2000);
      setTimeout(() => {navigate('/');}, 2200);
    } catch (error) {
      setNotification({ message: 'Erro ao realizar pedido!', type: 'error' });
      setTimeout(() => setNotification({ message: '', type: '' }), 2000);
    }
  };

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Informações de Entrega</p>

        <div className="multi-fields">
          <input type="text" placeholder='Nome' value={userDetails?.name || ''} readOnly />
          <input type="text" placeholder='Tel' value={userDetails?.phone || ''} readOnly />
        </div>

        <input type="email" placeholder='Email' value={userDetails?.email || ''} readOnly />
        <input type="text" placeholder='Rua' name="street" value={address.street || ''} onChange={handleChange} />

        <div className="multi-fields">
          <input type="text" placeholder='Numero' name="number" value={address.number || ''} onChange={handleChange} />
          <input type="text" placeholder='Bairro' name="neighborhood" value={address.neighborhood || ''} onChange={handleChange} />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Cep' name="zipCode" value={address.zipCode || ''} onChange={handleChange} />
          <input type="text" placeholder='Cidade' name="city" value={address.city || ''} onChange={handleChange} />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Estado' name="state" value={address.state || ''} onChange={handleChange} />
          <input type="text" placeholder='Pais' name="country" value={address.country} readOnly />
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Totais do Carrinho</h2>
          <div className="">
            <div className="cart-total-details">
              <p>Subtotal</p>
              <b>${getTotalCartAmount().toFixed(2)}</b>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Taxa de Entrega</p>
              <b>${getTotalCartAmount() === 0 ? 0 : 5}</b>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>${(getTotalCartAmount() + 5).toFixed(2)}</b>
            </div>
          </div>
          <button type="button" onClick={handlePayment} disabled={getTotalCartAmount() === 0 || !isAddressComplete()}>PAGAMENTO</button>
        </div>
      </div>
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </form>
  );
}

export default PlaceOrder;
