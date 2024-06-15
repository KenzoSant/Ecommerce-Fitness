import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [foodList, setFoodList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cartItemList, setCartItemList] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('isLoggedIn'));
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [userDetails, setUserDetails] = useState(null); // Definindo o estado para os detalhes do usuário


    useEffect(() => {
        const fetchFoodList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/foods');
                const foodListWithImagesAndCategories = response.data.map(food => ({
                    ...food,
                    image: `src/assets/${food.url_image}`
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
                    image: `src/assets/${category.url_image}`
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
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        cartItemList.forEach(item => {
            totalAmount += item.price * cartItems[item.id];
        });
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        Object.values(cartItems).forEach(quantity => {
            totalItems += quantity;
        });
        return totalItems;
    };

    const registerUser = async ({ name, email, password }) => {
        console.log('Registering user with data:', { name, email, password });
        try {
            const response = await axios.post('http://localhost:8080/clients/auth/register', {
                name,
                email,
                password,
            });
            console.log('Registration successful:', response.data);
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', response.data.id);  // Store user ID
            setUserId(response.data.id);
            return response.data;
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    };

    const loginUser = async (email, password) => {
        console.log('Logging in user with email:', email, password);
        try {
            const response = await axios.post('http://localhost:8080/clients/auth/login', {
                email,
                password
            });
            console.log('Login successful:', response.data);
    
            // Agora, você precisa buscar os detalhes do usuário usando o token ou identificador fornecido após o login.
            const userId = response.data.email; // Supondo que o ID do usuário seja retornado após o login
            console.log("AA",response.data.email);
            
            // Fazendo uma solicitação para obter os detalhes do usuário
            const userDetailsResponse = await axios.get(`http://localhost:8080/clients/email/${userId}`);
            const userDetails = userDetailsResponse.data;
    
            // Armazena os detalhes do usuário no estado do contexto
            setUserDetails(userDetails); // Suponha que exista uma função setUserDetails no seu contexto para atualizar os detalhes do usuário
    
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', userId);  
            return response.data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    };
    

    const logoutUser = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
        setUserId(null);
    };

    const fetchUserOrders = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/orders?clientId=${userId}`);
            setUserOrders(response.data);
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
        }
    };

    const contextValue = {
        foodList,
        categories,
        cartItems,
        setCartItems,
        cartItemList,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        registerUser,
        loginUser,
        logoutUser,
        isLoggedIn,
        userId,
        fetchUserOrders,
        userDetails
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;
