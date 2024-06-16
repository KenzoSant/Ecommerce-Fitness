import React, { useState, useEffect, useContext } from 'react';
import './Alter.css';
import { AdmContext } from '../../context/AdmContext';
import Select from 'react-select';

const Alter = ({ item, onClose }) => {
  const { ingredients, categories, deleteProduct, updateProduct } = useContext(AdmContext);
  const [editedName, setEditedName] = useState(item.name);
  const [editedPrice, setEditedPrice] = useState(item.price);
  const [editedCategory, setEditedCategory] = useState(item.id_CategoryFood);
  const [editedIngredients, setEditedIngredients] = useState(item.ingredients.map(ingredient => ingredient.id));
  const [selectedCategory, setSelectedCategory] = useState(item.id_CategoryFood);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    setEditedName(item.name);
    setEditedPrice(item.price);
    setEditedCategory(item.id_CategoryFood);
    setEditedIngredients(item.ingredients.map(ingredient => ingredient.id));
    setSelectedCategory(item.id_CategoryFood);
  }, [item]);

  const ingredientOptions = ingredients.map(ingredient => ({
    value: ingredient.id,
    label: ingredient.name,
  }));

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '1.5px solid var(--second-color-green)',
      borderRadius: '10px',
    }),
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(item.id);
      setNotification({ message: 'Removido com sucesso!', type: 'success' });
      setTimeout(() => setNotification({ message: '', type: '' }), 2000);
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      setNotification({ message: 'Erro ao remover!', type: 'error' });
      setTimeout(() => setNotification({ message: '', type: '' }), 2000);
    }
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleSaveChanges = async () => {
    const updatedItem = {
      ...item,
      name: editedName,
      price: editedPrice,
      id_CategoryFood: editedCategory,
      ingredients: editedIngredients.map(id => ({ id })),
    };
    try {
      await updateProduct(updatedItem);
      setNotification({ message: 'Alterado com sucesso!', type: 'success' });
      setTimeout(() => setNotification({ message: '', type: '' }), 2000);
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      setNotification({ message: 'Erro ao alterar!', type: 'error' });
      setTimeout(() => setNotification({ message: '', type: '' }), 2000);
    }
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value);
    setEditedCategory(selectedOption.value);
  };

  return (
    <div className="screen">
      <div className="box">
        <h2>Editar Produto</h2>
        <img src={item.image} alt={item.name} />
        <div className="list-info">
          <div className="flex-col class">
            <span>Nome:</span>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>

          <div className="flex-col class">
            <span>Preço:</span>
            <input
              type="text"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
            />
          </div>

          <div className="flex-col class">
            <span>Categoria:</span>
            <Select
              value={categoryOptions.find(option => option.value === selectedCategory)}
              onChange={handleCategoryChange}
              options={categoryOptions}
              styles={customStyles}
            />
          </div>

          <div className="flex-col class">
            <span>Ingredientes:</span>
            <Select
              isMulti
              value={editedIngredients.map(ingredientId => ({
                value: ingredientId,
                label: ingredientOptions.find(option => option.value === ingredientId)?.label || "",
              }))}
              onChange={(selectedOptions) => {
                setEditedIngredients(selectedOptions.map(option => option.value));
              }}
              options={ingredientOptions}
              styles={customStyles}
            />
          </div>
        </div>
        <div className="list-button">
          <button className="btn btn-list" onClick={handleSaveChanges}>Salvar</button>
          <button className="btn btn-list" onClick={handleDeleteClick}>Excluir</button>
          <button className="btn btn-list" onClick={onClose}>Fechar</button>
        </div>
        {showConfirmation && (
          <div className="confirmation-overlay">
            <div className="confirmation-box">
              <p>Deseja excluir o produto?</p>
              <div className="list-button">
                <button className="btn" onClick={handleConfirmDelete}>Sim</button>
                <button className="btn" onClick={handleCancelDelete}>Não</button>
              </div>
            </div>
          </div>
        )}
        {notification.message && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}
      </div>
    </div>
  );
};

export default Alter;
