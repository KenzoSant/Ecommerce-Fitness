import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import './Alter.css';
import { AdmContext } from '../../context/AdmContext';

const Notification = ({ message, type }) => {
  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

const ConfirmationDialog = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirmation-overlay">
      <div className="confirmation-box">
        <p>Do you want to delete the product?</p>
        <div className="list-button">
          <button className="btn" onClick={onConfirm}>Yes</button>
          <button className="btn" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

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

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 2000);
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(item.id);
      showNotification('Produto removido com sucesso!', 'success');
      onClose();
    } catch (error) {
      showNotification('Erro ao remover produto', 'error');
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
      showNotification('Alterações salvas com sucesso!', 'success');
      onClose();
    } catch (error) {
      showNotification('Erro ao salvar alterações', 'error');
    }
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value);
    setEditedCategory(selectedOption.value);
  };

  return (
    <div className="screen">
      <div className="box">
        <h2>Edit Product</h2>
        <img src={item.image} alt={item.name} />
        <div className="list-info">
          <div className="flex-col class">
            <span>Name:</span>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>

          <div className="flex-col class">
            <span>Price:</span>
            <input
              type="text"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
            />
          </div>

          <div className="flex-col class">
            <span>Category:</span>
            <Select
              value={categoryOptions.find(option => option.value === selectedCategory)}
              onChange={handleCategoryChange}
              options={categoryOptions}
              styles={customStyles}
            />
          </div>

          <div className="flex-col class">
            <span>Ingredients:</span>
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
          <button className="btn btn-list" onClick={handleSaveChanges}>Save</button>
          <button className="btn btn-list" onClick={handleDeleteClick}>Delete</button>
          <button className="btn btn-list" onClick={onClose}>Close</button>
        </div>
        {showConfirmation && (
          <ConfirmationDialog
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
      </div>
    </div>
  );
};

export default Alter;
