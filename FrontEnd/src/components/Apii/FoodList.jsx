import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodList = () => {
    const [foodList, setFoodList] = useState([]);

    useEffect(() => {
        const fetchFoodList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/foods');
                // Excluindo a chave 'url_image' de cada item da lista
                const formattedFoodList = response.data.map(({ url_image, ...rest }) => rest);
                setFoodList(formattedFoodList);
            } catch (error) {
                console.error('Erro ao buscar alimentos:', error);
            }
        };

        fetchFoodList();
    }, []);

    return (
        <div>
            <h2>Lista de Alimentos</h2>
            <ul>
                {foodList.map((food) => (
                    <li key={food.id}>
                        <div>
                            <h3>{food.name}</h3>
                            <p>Preço: R${food.price.toFixed(2)}</p>
                            <p>Kcal: {food.kcal}</p>
                            <p>Categoria: {food.id_CategoryFood}</p>
                            <p>Ingredientes: {food.ingredients.join(', ')}</p>
                            <p>Status: {food.status ? 'Disponível' : 'Indisponível'}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FoodList;
