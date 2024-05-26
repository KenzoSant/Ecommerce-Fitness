import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AdmContext = createContext(null);

const AdmContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [foodList, setFoodList] = useState([]);
    const [cartItemList, setCartItemList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);

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

        fetchFoodList();
        fetchCategories();
        fetchIngredients();
    }, []);

    const deleteProduct = async (itemId) => {
        try {
            await axios.delete(`http://localhost:8080/foods/${itemId}`);
            setFoodList((prev) => prev.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
        }
    };

    const updateProduct = async (updatedItem) => {
        try {
            console.log("Atualiza:",updatedItem);
            const response = await axios.put(`http://localhost:8080/foods/${updatedItem.id}`, updatedItem);
            setFoodList((prev) => prev.map(item => (item.id === updatedItem.id ? response.data : item)));
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        }
    };

    const addFood = async (formData, categoryId, selectedIngredientIds, onSuccess, onError) => {
        if (isNaN(categoryId)) {
            console.error('Category ID is not a valid number');
            // Tratar o erro de forma apropriada, como interromper o envio da solicitação ou fornecer feedback ao usuário
            return;
        }
        
        const foodData = {
            name: formData.name,
            price: parseFloat(formData.price),
            kcal: parseInt(formData.kcal),
            id_CategoryFood: categoryId, // Usar o categoryId em vez de formData.category
            ingredients: selectedIngredientIds.map(id => ({ id: parseInt(id) })),
            url_image: formData.image ? formData.image.name : '',
        };
    
        console.log('Dados do formulário:', foodData);
    
        try {
            const response = await axios.post('http://localhost:8080/foods', foodData);
            setFoodList(prev => [...prev, response.data]);
            onSuccess(response.data);
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
            onError(error);
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
        getTotalCartAmount,
        getTotalCartItems,
        categories,
        ingredients,
    };

    return (
        <AdmContext.Provider value={contextValue}>
            {props.children}
        </AdmContext.Provider>
    );
};

export default AdmContextProvider;
