import React, { useContext } from 'react';
import { StoreContext } from '../../context/AdmContext';

function List() {
  const { foodList, addToCart } = useContext(StoreContext);

  return (
    <div>
      <h1>Food Items</h1>
      <ul>
        {foodList.map(item => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} />
            {item.name}
            <button onClick={() => addToCart(item.id, item.name, item.price, item.image)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
