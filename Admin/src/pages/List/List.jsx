import React, { useState, useContext } from 'react';
import './List.css';
import { AdmContext } from '../../context/AdmContext';
import { assets } from '../../assets/assets';
import Add from '../Add/Add';
import Alter from '../Alter/Alter';

const List = () =>{
  const { foodList } = useContext(AdmContext);
  const [showAddForm, setShowAddForm] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const itemsPerPage = 6;

  const filteredFoodList = foodList.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFoodList.length / itemsPerPage);

  const handleEditClick = (item) => {
    setSelectedItem(item);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentFoodList = filteredFoodList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="list">
      <h1>Food Items</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a food item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="container-list">
        <ul className="food-list">
        {currentFoodList.map((item) => {
          return (
            <li key={item.id} className="food-item">
              <div className="food-card">
                <img src={item.image} alt={item.name} className="food-image" />
                <div className="food-details">
                  <h3>{item.name}</h3>  
                </div>
                <div className='principal'>
                  <button className="btn" onClick={() => handleEditClick(item)}>Editar</button>
                </div>
              </div>
            </li>
         )
         })}
        </ul>
      </div>
      {selectedItem && (
        <Alter
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
      {showAddForm && (
          <Add setShowAddForm={setShowAddForm}/>
      )}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`btn ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button className="add" onClick={() => setShowAddForm(true)}>
        <img src={assets.plus} alt="Add Foods" />
      </button>
    </div>
  );
}

export default List;

