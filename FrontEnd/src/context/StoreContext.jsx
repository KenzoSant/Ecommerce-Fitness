import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [foodList, setFoodList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cartItemList, setCartItemList] = useState(JSON.parse(localStorage.getItem('cartItemList')) || []);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('isLoggedIn'));
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')) || null);
    const [userOrders, setUserOrders] = useState([]);

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

    useEffect(() => {
        localStorage.setItem('cartItemList', JSON.stringify(cartItemList));
    }, [cartItemList]);

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
        if (cartItems[itemId] > 1) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
            const updatedCartItemList = cartItemList.map(item => {
                if (item.id === itemId) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            setCartItemList(updatedCartItemList);
        } else {
            setCartItems((prev) => {
                const updatedCartItems = { ...prev };
                delete updatedCartItems[itemId];
                return updatedCartItems;
            });
            const updatedCartItemList = cartItemList.filter(item => item.id !== itemId);
            setCartItemList(updatedCartItemList);
        }
    };

    const clearCart = () => {
        setCartItems({});
        setCartItemList([]);
    };

    const getTotalCartAmount = () => {
        return cartItemList.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getTotalCartItems = () => {
        return cartItemList.reduce((total, item) => total + item.quantity, 0);
    };

    const registerUser = async ({ name, email, password }) => {
        try {
            const response = await axios.post('http://localhost:8080/clients/auth/register', {
                name,
                email,
                password,
            });
            console.log('Registration successful:', response.data);
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', response.data.id);
            setUserId(response.data.id);
            setUserDetails(response.data);
            localStorage.setItem('userDetails', JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    };
    

    const loginUser = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/clients/auth/login', {
                email,
                password
            });
            console.log('Login successful:', response.data);

            const userId = response.data.email;
            console.log("AA", response.data.email);

            const userDetailsResponse = await axios.get(`http://localhost:8080/clients/email/${userId}`);
            const userDetails = userDetailsResponse.data;

            setUserDetails(userDetails);
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', userId);
            console.log("BB", localStorage);

            // Atualiza o estado userId
            setUserId(userId);

            fetchUserOrders(userId);

            return response.data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    };

    const updateUser = (userData) => {
        setUserDetails(userData);
    };

    const logoutUser = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('userDetails');
        setUserId(null);
        setUserDetails(null);
        setUserOrders([]);
        clearCart(); // Limpar carrinho ao deslogar
        console.log("BB", localStorage);
    };

    const fetchUserOrders = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/orders/client/${userId}`);
            setUserOrders(response.data);
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
        }
    };

    const updateUserDetails = async (userData) => {
        try {
            // Verifica se é uma atualização ou inserção
            if (userData.id) {
                // Atualização
                await axios.put(`http://localhost:8080/clients/email/${userData.email}`, userData);
            } else {
                // Inserção
                await registerUser(userData.name, userData.email, userData.password);
            }
            setUserDetails(userData);
            localStorage.setItem('userDetails', JSON.stringify(userData));
        } catch (error) {
            console.error('Erro ao atualizar detalhes do usuário:', error);
            throw error;
        }
    };

    const registerOrUpdateUser = async (userData) => {
        console.log("CC",userData);
        try {
            // Sempre realiza uma inserção de usuário
            const response = await axios.post(`http://localhost:8080/clients/email/${userData.email}`, userData);
            console.log("UP1", userData);
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', response.data.id);
            setUserId(response.data.id);
            setUserDetails(response.data);
            localStorage.setItem('userDetails', JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            console.error('Erro durante o cadastro do usuário:', error);
            throw error;
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
        clearCart,
        getTotalCartAmount,
        getTotalCartItems,
        registerUser,
        loginUser,
        logoutUser,
        isLoggedIn,
        userId,
        fetchUserOrders,
        userDetails,
        userOrders,
        updateUser,
        setUserOrders,
        updateUserDetails,
        registerOrUpdateUser,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;
