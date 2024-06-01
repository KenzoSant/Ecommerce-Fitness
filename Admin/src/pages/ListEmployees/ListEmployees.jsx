import React, { useContext, useState } from 'react';
import './ListEmployees.css';
import { AdmContext } from "../../context/AdmContext";

const ListEmployees = () => {
    const { users } = useContext(AdmContext);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    {filteredUsers.map((user) => (
                        <li key={user.id} className="employee-item">
                            <div className="employee-card">
                                <div className="employee-details">
                                    <h3>{user.name}</h3>
                                    <p>{user.email}</p>
                                    <p>{user.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ListEmployees;
