import React, { useContext, useState } from 'react';
import './ListEmployees.css';
import { AdmContext } from "../../context/AdmContext";
import AlterEmployees from '../AlterEmployees/AlterEmployees'; // Import the modal component

const ListEmployees = () => {
    const { users } = useContext(AdmContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const itemsPerPage = 6;

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handleEditClick = (user) => {
        setSelectedEmployee(user);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                                <div className='list-button principal'>
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
        </div>
    );
};

export default ListEmployees;
