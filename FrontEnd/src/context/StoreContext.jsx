// StoreContextProvider.js
import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [foodList, setFoodList] = useState([]);

    useEffect(() => {
        const fetchFoodList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/foods');
                const foodListWithImages = response.data.map(food => ({
                    ...food,
                    image: `src/assets/${food.url_image}` // Adicionando a URL da imagem ao objeto de alimento
                }));
                setFoodList(foodListWithImages);
            } catch (error) {
                console.error('Erro ao buscar alimentos:', error);
            }
        };

        fetchFoodList();
    }, []);

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    const contextValue = {
        foodList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
