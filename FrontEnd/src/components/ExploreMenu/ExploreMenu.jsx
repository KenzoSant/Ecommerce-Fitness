import React, { useContext } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
    const { categories } = useContext(StoreContext);

    return (
        <div className="explore-menu" id="explore-menu">
            <h1>Our Menu</h1>
            <p>Find your best dish</p>
            <div className="explore-menu-list">
                {categories.map((item, index) => (
                    <div
                        onClick={() => setCategory(prev => (prev === item.name ? "All" : item.name))}
                        key={index}
                        className="explore-menu-list-item"
                    >
                        <img className={category === item.name ? "active" : ""} src={item.image} />
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>

            <hr />
        </div>
    );
};

export default ExploreMenu;