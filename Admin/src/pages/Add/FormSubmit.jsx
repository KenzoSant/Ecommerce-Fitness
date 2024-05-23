import React from 'react';
import axios from 'axios';

const FormSubmit = ({ formData, selectedIngredients, onSuccess, onError }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertendo os IDs de ingredientes em um objeto com chaves únicas
    const foodData = {
      name: formData.name,
      price: parseFloat(formData.price),
      kcal: parseInt(formData.kcal),
      id_CategoryFood: parseInt(formData.category), // Certifique-se de que o ID da categoria seja enviado como um número
      ingredients: selectedIngredients.map(id => ({ id: parseInt(id) })), // Mapeia os IDs dos ingredientes para o formato esperado
      url_image: formData.image ? formData.image.name : '', // Se houver uma imagem, envie o nome do arquivo
    };

    // Exibindo os dados no console antes de enviar a solicitação
    console.log('Dados do formulário:', foodData);

    try {
      const response = await axios.post('http://localhost:8080/foods', foodData);
      onSuccess(response.data);
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
      onError(error);
    }
  };

  return (
    <button type="submit" className="add-btn" onClick={handleSubmit}>
      ADD
    </button>
  );
};

export default FormSubmit;
