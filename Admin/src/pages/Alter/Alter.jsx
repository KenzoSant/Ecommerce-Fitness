import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import './Alter.css';
import { AdmContext } from '../../context/AdmContext';

const Alter = ({ item, onClose }) => {
  const { ingredients, categories, deleteProduct, updateProduct } = useContext(AdmContext);
  const [editedName, setEditedName] = useState(item.name);
  const [editedPrice, setEditedPrice] = useState(item.price);
  const [editedCategory, setEditedCategory] = useState(item.id_CategoryFood);
  const [editedIngredients, setEditedIngredients] = useState(item.ingredients.map(ingredient => ingredient.id));
  const [selectedCategory, setSelectedCategory] = useState(item.id_CategoryFood);
  const [showConfirmation, setShowConfirmation] = useState(false);
  

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

  const handleConfirmDelete = () => {
    deleteProduct(item.id);
    setShowConfirmation(false);
    onClose();
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleSaveChanges = () => {
    const updatedItem = {
      ...item,
      name: editedName,
      price: editedPrice,
      id_CategoryFood: editedCategory,
      ingredients: editedIngredients.map(id => ({ id })),
    };
    updateProduct(updatedItem);
    onClose();
  };

  const handleAddIngredient = () => {
    // Add ingredient logic
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value);
    setEditedCategory(selectedOption.value);
  };

  return (
    <div className="edit-screen">
      <div className="edit-box">
        <h2>Edit Product</h2>
        <div className="edit-box-info">
          <img src={item.image} alt={item.name} />
          <div className="list-info">
            <span>Name:</span>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <span>Price:</span>
            <input
              type="text"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
            />
            <span>Category:</span>
            <Select
              value={categoryOptions.find(option => option.value === selectedCategory)}
              onChange={handleCategoryChange}
              options={categoryOptions}
              styles={customStyles}
            />
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
          <div className="confirmation-overlay">
            <div className="confirmation-box">
              <p>Do you want to delete the product?</p>
              <div className="list-button">
                <button className="btn" onClick={handleConfirmDelete}>Yes</button>
                <button className="btn" onClick={handleCancelDelete}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alter;
