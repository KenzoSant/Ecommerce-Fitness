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
            setUserDetails(response.data); // Update user details
            localStorage.setItem('userDetails', JSON.stringify(response.data)); // Store user details in localStorage
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
    
            const userId = response.data.email;
            console.log("AA",response.data.email);
            
            const userDetailsResponse = await axios.get(`http://localhost:8080/clients/email/${userId}`);
            const userDetails = userDetailsResponse.data;
    
            setUserDetails(userDetails);
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', userId);
            
            // Após atualizar os detalhes do usuário, buscar os pedidos do usuário
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
        setUserOrders([]); // Limpar os pedidos do usuário
    };

    const fetchUserOrders = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/orders/client/${userId}`);
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
        userDetails,
        userOrders,
        updateUser, 
        setUserOrders, 
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;
