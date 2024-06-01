import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import './AlterEmployees.css';
import { AdmContext } from '../../context/AdmContext';

const AlterEmployees = ({ employee, onClose }) => {
  const { updateEmployee, deleteEmployee, roles } = useContext(AdmContext);
  const [editedName, setEditedName] = useState(employee.name);
  const [editedEmail, setEditedEmail] = useState(employee.email);
  const [editedRole, setEditedRole] = useState(employee.role);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setEditedName(employee.name);
    setEditedEmail(employee.email);
    setEditedRole(employee.role);
  }, [employee]);

  const roleOptions = roles.map(role => ({
    value: role,
    label: role,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '1.5px solid var(--second-color-green)',
      borderRadius: '10px',
    }),
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    deleteEmployee(employee.id);
    setShowConfirmation(false);
    onClose();
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleSaveChanges = () => {
    const updatedEmployee = {
      ...employee,
      name: editedName,
      email: editedEmail,
      role: editedRole,
    };
    updateEmployee(updatedEmployee);
    onClose();
  };

  const handleRoleChange = (selectedOption) => {
    setEditedRole(selectedOption.value);
  };

  return (
    <div className="edit-screen">
      <div className="edit-box">
        <h2>Edit Employee</h2>
        <div className="edit-box-info">
          <div className="list-info">
            <span>Name:</span>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <span>Email:</span>
            <input
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
            <span>Role:</span>
            <Select
              value={roleOptions.find(option => option.value === editedRole)}
              onChange={handleRoleChange}
              options={roleOptions}
              styles={customStyles}
            />
          </div>
        </div>
        <div className="list-button">
          <button className="btn btn-list" onClick={handleSaveChanges}>Save</button>
          <button className="btn btn-list" onClick={handleDeleteClick}>Delete</button>
          <button className="btn btn-list" onClick={onClose}>Close</button>
        </div>
        {showConfirmation && (
          <div className="confirmation-overlay">
            <div className="confirmation-box">
              <p>Do you want to delete this employee?</p>
              <div className="list-button">
                <button className="btn" onClick={handleConfirmDelete}>Yes</button>
                <button className="btn" onClick={handleCancelDelete}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlterEmployees;
