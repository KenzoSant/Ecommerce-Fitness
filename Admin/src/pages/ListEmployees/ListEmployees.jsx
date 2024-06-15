import React, { useContext, useState } from 'react';
import './ListEmployees.css';
import { AdmContext } from '../../context/AdmContext';
import { assets } from '../../assets/assets';
import AddEmployees from '../AddEmployees/AddEmployees';
import AlterEmployees from '../AlterEmployees/AlterEmployees';

const ListEmployees = () => {
  const { users, deleteEmployee, updateEmployee, registerEmployee } = useContext(AdmContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const itemsPerPage = 6;

  // Ensure users is defined and is an array
  const filteredUsers = (users || []).filter(user => 
    user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleEditClick = (user) => {
    setSelectedEmployee(user);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (userId) => {
    await deleteEmployee(userId);
  };

  const handleAddEmployee = async (employeeData) => {
    await registerEmployee(employeeData);
    setShowAddForm(false); // Close the form after adding an employee
  };

  return (
    <div className="list">
      <h1>Employees</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for an employee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="container-list">
        <ul className="employee-list">
          {currentUsers.map((user) => (
            <li key={user.id} className="employee-item">
              <div className="employee-card">
                <div className="employee-details">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <p>{user.role}</p>
                </div>
                <div className="principal">
                  <button className="btn" onClick={() => handleEditClick(user)}>Editar</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedEmployee && (
        <AlterEmployees
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
      {showAddForm && (
            <AddEmployees onAdd={handleAddEmployee} setShowAddForm={setShowAddForm} />
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
        <img src={assets.plus} alt="Add Employee" />
      </button>
    </div>
  );
};

export default ListEmployees;
