import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AdmContext = createContext(null);

const AdmContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [foodList, setFoodList] = useState([]);
    const [cartItemList, setCartItemList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [admin, setAdmin] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('isLoggedIn'));
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFoodList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/foods');
                const foodListWithImagesAndCategories = response.data.map(food => ({
                    ...food,
                    image: `http://localhost:5174/src/assets/${food.url_image}`
                }));
                setFoodList(foodListWithImagesAndCategories);
            } catch (error) {
                console.error('Erro ao buscar alimentos:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/categoriesFood');
                setCategories(response.data);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        const fetchIngredients = async () => {
            try {
                const response = await axios.get('http://localhost:8080/ingredients');
                setIngredients(response.data);
            } catch (error) {
                console.error('Erro ao buscar ingredientes:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/employees');
                setUsers(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const storedAdmin = JSON.parse(localStorage.getItem('admin'));
        setIsLoggedIn(storedIsLoggedIn);
        setAdmin(storedAdmin);

        fetchFoodList();
        fetchCategories();
        fetchIngredients();
        fetchUsers();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
        }
    };

    const loginAdmin = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/employees/auth/login', {
                email,
                password
            });
            setAdmin(response.data);
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('admin', JSON.stringify(response.data));
            navigate('/list');
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setAdmin(null);
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('admin');
        navigate('/login');
    };

    const registerEmployee = async (employeeData) => {
        try {
            const response = await axios.post('http://localhost:8080/employees/auth/register', employeeData);
            setUsers((prevUsers) => [...prevUsers, response.data]);
        } catch (error) {
            throw error;
        }
    };

    const deleteProduct = async (itemId) => {
        try {
            await axios.delete(`http://localhost:8080/foods/${itemId}`);
            setFoodList((prev) => prev.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
        }
    };

    const updateEmployee = async (updatedEmployee) => {
        try {
            await axios.put(`http://localhost:8080/employees/${updatedEmployee.id}`, updatedEmployee);
            setUsers((prevUsers) => prevUsers.map(user => user.id === updatedEmployee.id ? updatedEmployee : user));
        } catch (error) {
            throw error;
        }
    };

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/employees/${id}`);
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
        } catch (error) {
            throw error;
        }
    };

    const updateProduct = async (updatedItem) => {
        try {
            await axios.put(`http://localhost:8080/foods/${updatedItem.id}`, updatedItem);
            setFoodList((prevFoodList) =>
                prevFoodList.map((item) => (item.id === updatedItem.id ? updatedItem : item))
            );
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        }
    };

    const addFood = async (formData, categoryId, selectedIngredientIds, onSuccess, onError) => {
        const now = new Date();
        const formattedDateTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}`;
        const foodData = {
            name: formData.name,
            price: parseFloat(formData.price),
            kcal: parseInt(formData.kcal),
            id_CategoryFood: categoryId,
            ingredients: selectedIngredientIds.map(id => ({ id: parseInt(id) })),
            url_image: formData.image ? `${formattedDateTime}_${formData.image.name}` : '',
        };

        try {
            const response = await axios.post('http://localhost:8080/foods', foodData);
            setFoodList(prev => [...prev, response.data]);
            onSuccess(response.data);
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
            onError(error);
        }
    };

    const addFoodImage = async (imageFile, onSuccess, onError) => {
        const imageData = new FormData();
        imageData.append('image', imageFile);

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: imageData
            });
            if (!response.ok) {
                throw new Error('Erro ao fazer upload da imagem');
            }
            const responseData = await response.json();
            onSuccess(responseData);
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
            onError(error);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:8080/orders/${orderId}`, { orderStage: newStatus });
            setOrders((prevOrders) => prevOrders.map(order => order.id === orderId ? { ...order, orderStage: newStatus } : order));
        } catch (error) {
            console.error('Erro ao atualizar status do pedido:', error);
        }
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

    const contextValue = {
        foodList,
        deleteProduct,
        updateProduct,
        addFood,
        addFoodImage,
        getTotalCartAmount,
        getTotalCartItems,
        categories,
        ingredients,
        loginAdmin,
        registerEmployee,
        deleteEmployee,
        updateEmployee,
        admin,
        isLoggedIn,
        users,
        logout,
        orders,
        updateOrderStatus,
        fetchOrders,
    };

    return (
        <AdmContext.Provider value={contextValue}>
            {props.children}
        </AdmContext.Provider>
    );
};

export default AdmContextProvider;
