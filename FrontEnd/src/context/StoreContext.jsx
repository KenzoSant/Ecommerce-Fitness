import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [foodList, setFoodList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cartItemList, setCartItemList] = useState([]); // Lista de itens do carrinho

    useEffect(() => {
        const fetchFoodList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/foods');
                const foodListWithImagesAndCategories = response.data.map(food => ({
                    ...food,
                    image: `src/assets/${food.url_image}` // Adicionando a URL da imagem ao objeto de alimento
                }));
                setFoodList(foodListWithImagesAndCategories);
            } catch (error) {
                console.error('Erro ao buscar alimentos:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/categoriesFood');
                const categoriesWithImages = response.data.map(category => ({
                    ...category,
                    image: `src/assets/${category.url_image}` // Adicionando a URL da imagem ao objeto de categoria
                }));
                setCategories(categoriesWithImages);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        fetchFoodList();
        fetchCategories();
    }, []);

    const addToCart = (itemId, itemName, itemPrice, itemImage) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
            setCartItemList((prev) => ([...prev, { id: itemId, name: itemName, price: itemPrice, image: itemImage, quantity: 1 }]));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            const updatedCartItemList = cartItemList.map(item => {
                if (item.id === itemId) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            setCartItemList(updatedCartItemList);
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        const updatedCartItemList = cartItemList.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItemList(updatedCartItemList.filter(item => item.quantity > 0));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        cartItemList.forEach(item => {
            totalAmount += item.price * cartItems[item.id];
        });
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        Object.values(cartItems).forEach(quantity => {
            totalItems += quantity;
        });
        return totalItems;
    }

    const contextValue = {
        foodList,
        categories,
        cartItems,
        setCartItems,
        cartItemList,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
