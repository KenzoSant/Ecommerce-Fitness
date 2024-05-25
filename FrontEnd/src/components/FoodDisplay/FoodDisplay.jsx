import React, { useContext } from 'react';
import "./FoodDisplay.css";
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { foodList, categories } = useContext(StoreContext);

    return (
        <div className="food-display" id="food-display">
            <h2>Best dishes</h2>
            <div className="food-display-list">
                {foodList.map((item, index) => {
                    const foodCategory = categories.find(cat => cat.id === item.id_CategoryFood);
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
