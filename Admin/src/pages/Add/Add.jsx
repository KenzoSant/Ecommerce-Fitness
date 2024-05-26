import React, { useState, useContext } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import { AdmContext } from '../../context/AdmContext';

const Add = () => {
  const { categories, ingredients, addFood } = useContext(AdmContext);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    kcal: '',
    category: '',
    description: '',
    image: null
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleIngredientChange = (e, index) => {
    const newIngredientIds = [...selectedIngredientIds];
    newIngredientIds[index] = e.target.value;
    setSelectedIngredientIds(newIngredientIds);
  };

  const handleAddIngredient = () => {
    setSelectedIngredientIds([...selectedIngredientIds, selectedIngredient]);
    setSelectedIngredient('');
  };

  const handleRemoveIngredient = (index) => {
    const newIngredientIds = [...selectedIngredientIds];
    newIngredientIds.splice(index, 1);
    setSelectedIngredientIds(newIngredientIds);
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSuccess = (data) => {
    console.log('Food added successfully:', data);
    setFormData({
      name: '',
      price: '',
      kcal: '',
      category: '',
      description: '',
      image: null
    });
    setSelectedIngredientIds([]);
    setSuccessMessage('Cadastrado com sucesso!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleError = (error) => {
    console.error('Error adding food:', error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addFood(formData, selectedIngredientIds, handleSuccess, handleError);
  };

  return (
    <div className="add">
      <form onSubmit={handleSubmit} className='flex-col'>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={formData.image ? URL.createObjectURL(formData.image) : assets.upload_area} alt="" />
          </label>
          <input type="file" id='image' name="image" onChange={handleChange} hidden required />
        </div>

        <div className="add-product-name flex-col class">
          <p>Product Name</p>
          <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Type Here' required />
        </div>

        <div className="add-product-price flex-col class">
          <p>Product Price</p>
          <input type="number" name='price' value={formData.price} onChange={handleChange} placeholder='Type Here' required />
        </div>

        <div className="add-product-kcal flex-col class">
          <p>Product Kcal</p>
          <input type="number" name='kcal' value={formData.kcal} onChange={handleChange} placeholder='Type Here' required />
        </div>

        <div className="add-product-category flex-col class">
          <p>Product Category</p>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="" disabled className="placeholder-option">Choose a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="add-product-category flex-col class">
          <p>Product Ingredients</p>
          <select
            name="ingredients"
            value={selectedIngredient}
            onChange={(e) => setSelectedIngredient(e.target.value)}
          >
            <option value="" disabled className="placeholder-option">Choose an ingredient</option>
            {ingredients.map((ingredient, index) => (
              <option key={index} value={ingredient.id}>{ingredient.name}</option>
            ))}
          </select>
        </div>

        <div className="add-product-ingredients flex-col class">
          {selectedIngredientIds.map((ingredientId, index) => (
            <div key={index} className="ingredient-input class">
              <input
                type="text"
                placeholder={`Ingredient ${index + 1}`}
                value={ingredientId || ''}
                onChange={(e) => handleIngredientChange(e, index)}
              />
              <button type="button" className='rem-ing' onClick={() => handleRemoveIngredient(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient} className='add-ing'>Add Ingredient</button>
        </div>

        <div className="add-product-description flex-col class">
          <p>Product Description</p>
          <textarea name='description' value={formData.description} onChange={handleChange} rows='5' placeholder='Type Here' required />
        </div>

        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" className="add-btn erclass">ADD</button>
      </form>
    </div>
  );
};

export default Add;
