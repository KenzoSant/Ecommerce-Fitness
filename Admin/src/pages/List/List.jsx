import React, { useContext, useState } from 'react';
import { AdmContext } from '../../context/AdmContext';
import Select from 'react-select';
import './List.css';

function List() {
  const { foodList, deleteProduct, updateProduct, ingredients, addNewIngredient } = useContext(AdmContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showEditScreen, setShowEditScreen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedIngredients, setEditedIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');

  const handleDeleteClick = (itemId) => {
    setSelectedItemId(itemId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    deleteProduct(selectedItemId);
    setShowConfirmation(false);
    setSelectedItemId(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setSelectedItemId(null);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setEditedName(item.name);
    setEditedPrice(item.price);
    setEditedIngredients(item.ingredients.map(ingredient => ingredient.id)); // Alterado para armazenar apenas os IDs dos ingredientes
    setShowEditScreen(true);
  };

  const handleCloseEditScreen = () => {
    setShowEditScreen(false);
    setSelectedItem(null);
  };

  const handleSaveChanges = () => {
    // Transforma a lista de IDs de ingredientes em uma lista de objetos contendo apenas o ID
    const editedIngredientObjects = editedIngredients.map(id => ({ id }));

    const updatedItem = {
        ...selectedItem,
        name: editedName,
        price: editedPrice,
        ingredients: editedIngredientObjects // Define a lista de ingredientes conforme a transformação
    };

    updateProduct(updatedItem);
    setShowEditScreen(false);
    setSelectedItem(null);
};



  const handleAddIngredient = () => {
    if (selectedIngredient.trim() !== '') {
      const ingredientId = parseInt(selectedIngredient);
      if (!isNaN(ingredientId)) {
        setEditedIngredients([...editedIngredients, ingredientId]);
      } else {
        console.error('O ID do ingrediente não é um número válido.');
      }
      setSelectedIngredient('');
    }
  };

  const ingredientOptions = ingredients.map(ingredient => ({
    value: ingredient.id,
    label: ingredient.name
  }));

  return (
    <div className="list">
      <h1>Food Items</h1>
      <div className="container-list">
        <ul className="food-list">
          {foodList.map((item) => (
            <li key={item.id} className="food-item">
              <img src={item.image} alt={item.name} />
              <div className="list-info-item">
                <p>{item.name}</p>
              </div>
              <div className='list-button'>
                <button className="btn" onClick={() => handleEditClick(item)}>Editar</button>
                <button className="btn" onClick={() => handleDeleteClick(item.id)}>Remover</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <p>Deseja excluir o produto?</p>
            <button className="btn" onClick={handleConfirmDelete}>Sim</button>
            <button className="btn" onClick={handleCancelDelete}>Não</button>
          </div>
        </div>
      )}
      {showEditScreen && selectedItem && (
        <div className="edit-screen">
          <div className="edit-box">
            <h2>Editar Produto</h2>
            <div className="edit-box-info">
              <img src={selectedItem.image} alt={selectedItem.name} />
              <div className="list-info">
                <span>Nome:</span>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <span>Valor:</span>
                <input
                  type="text"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                />
                <span>Ingredientes:</span>
                <Select className='select-ing'
                  isMulti
                  value={editedIngredients.map(ingredientId => ({ value: ingredientId, label: ingredientId }))}
                  onChange={(selectedOptions) => {
                    setEditedIngredients(selectedOptions.map(option => option.value));
                  }}
                  options={ingredientOptions}
                />
              </div>
            </div>
            <div className="list-button">
              <button className="btn" onClick={handleSaveChanges}>Salvar</button>
              <button className="btn" onClick={handleCloseEditScreen}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
