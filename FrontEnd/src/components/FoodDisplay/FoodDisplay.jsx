import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "./FoodDisplay.css";
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { foodList } = useContext(StoreContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/categoriesFood');
                setCategories(response.data);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="food-display" id="food-display">
            <h2>Best dishes</h2>
            <div className="food-display-list">
                {foodList.map((item, index) => {
                    // Encontrando a categoria correspondente ao item de comida pelo ID
                    const foodCategory = categories.find(cat => cat.id === item.id_CategoryFood);
                    
                    // Verificando se a categoria do item de comida corresponde à categoria atual
                    if (category === "All" || (foodCategory && category === foodCategory.name)) {
                        return <FoodItem key={index} id={item.id} category={foodCategory?.name || ''} {...item} />;
                    }
                    return null;
                })}
            </div>
        </div>
    );
    
};

export default FoodDisplay; 