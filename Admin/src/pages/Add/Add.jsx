import React, { useState, useContext } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import { AdmContext } from '../../context/AdmContext';
import Select from 'react-select';

const Add = ({ setShowAddForm }) => {
  const { categories, ingredients, addFood } = useContext(AdmContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    kcal: '',
    category: '',
    description: '',
    image: null
  });
    const [success, setSuccess] = useState('');

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
      description: '',
      image: null
    });
    setSelectedCategory(null); // Reset selected category to null
    setSelectedIngredients([]);
    setSuccess('Cadastrado com sucesso!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value); // Update state with selected category ID
    setFormData({ ...formData, category: selectedOption.label }); // Set category label in form data
  };

  const handleIngredientsChange = (selectedOptions) => {
    const selectedIngredientIds = selectedOptions.map(option => option.value);
    setSelectedIngredients(selectedIngredientIds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addFood(formData, selectedCategory, selectedIngredients, handleSuccess, handleError);
  };

  const handleError = (error) => {
    console.error('Error adding food:', error);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '1.5px solid var(--second-color-green)',
      borderRadius: '10px'
    })
  };

  return (
    <div className="add-screen">
      <div className="add-box">
        <h1>Cadastros</h1>
        <form onSubmit={handleSubmit}>
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={formData.image ? URL.createObjectURL(formData.image) : assets.upload_area} alt="" />
            </label>
            <input type="file" id='image' name="image" onChange={handleChange} hidden  />
          </div>

          <div className="add-product-category flex-col class">
            <p>Product Category</p>
            <Select
              options={categories.map(category => ({ value: category.id, label: category.name }))}
              value={selectedCategory ? { value: selectedCategory, label: categories.find(category => category.id === selectedCategory).name } : null}
              onChange={handleCategoryChange}
              placeholder="Select Category"
              required
              isClearable
              styles={customStyles}
            />
          </div>

          <div className="add-product-name flex-col class">
            <p>Product Name</p>
            <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Type Here' required />
          </div>

          <div className="add-product-ingredients flex-col class">
            <p>Product Ingredients</p>
            <Select
              isMulti
              options={ingredients.map(ingredient => ({ value: ingredient.id, label: ingredient.name }))}
              value={selectedIngredients.map(id => ({ value: id, label: ingredients.find(ingredient => ingredient.id === id).name }))}
              onChange={handleIngredientsChange}
              placeholder="Select Ingredients"
              isClearable
              styles={customStyles}
            />
          </div>

          <div className="add-product-price flex-col class">
            <p>Product Price</p>
            <input type="number" name='price' value={formData.price} onChange={handleChange} placeholder='Type Here' required />
          </div>

          <div className="add-product-description flex-col class">
            <p>Product Description</p>
            <textarea name='description' value={formData.description} onChange={handleChange} rows='1' placeholder='Type Here' required />
          </div>

          <div className="add-product-kcal flex-col class">
            <p>Product Kcal</p>
            <input type="number" name='kcal' value={formData.kcal} onChange={handleChange} placeholder='Type Here' required />
          </div>

          <div className="add-product-kcal flex-col class">
          </div>

          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="add-btn ">ADD</button>
          <button type="button" className="add-btn " onClick={() => setShowAddForm(false)}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
