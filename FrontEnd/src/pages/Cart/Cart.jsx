import React, { useContext } from 'react';
import "./Cart.css";
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItemList, removeFromCart, getTotalCartAmount } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cartItemList.map((item, index) => {
          return (
            <div className="" key={item.id}>
              <div className="cart-items-title cart-items-item">
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>R${item.price.toFixed(2)}</p>
                <p>{item.quantity}</p>
                <p>R${(item.price * item.quantity).toFixed(2)}</p>
                <p onClick={() => removeFromCart(item.id)} className="cross">×</p>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="">
            <div className="cart-total-details">
              <p>Subtotal</p>
              <b>${getTotalCartAmount().toFixed(2)}</b>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <b>${getTotalCartAmount() === 0 ? 0 : 5}</b>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>${(getTotalCartAmount() + 5).toFixed(2)}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PRONTO</button>
        </div>
        <div className="cart-promocode">
          <div className="">
            <p>Tem um código de promoção? Digite-o</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo Code' />
              <button>VALIDAR</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
