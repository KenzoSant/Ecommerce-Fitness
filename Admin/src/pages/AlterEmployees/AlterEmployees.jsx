import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import './AlterEmployees.css';
import { AdmContext } from '../../context/AdmContext';

const AlterEmployees = ({ employee, onClose }) => {
  const { updateEmployee, deleteEmployee } = useContext(AdmContext);
  const [editedName, setEditedName] = useState(employee.name);
  const [editedEmail, setEditedEmail] = useState(employee.email);
  const [editedGender, setEditedGender] = useState(employee.gender);
  const [editedBirthDate, setEditedBirthDate] = useState(employee.birthDate);
  const [editedPhone, setEditedPhone] = useState(employee.phone);
  const [editedCpf, setEditedCpf] = useState(employee.cpf);
  const [editedPassword, setEditedPassword] = useState(employee.password);
  const [editedRole, setEditedRole] = useState(employee.role);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    setEditedName(employee.name);
    setEditedEmail(employee.email);
    setEditedGender(employee.gender);
    setEditedBirthDate(formatDate(employee.birthDate));
    setEditedPhone(employee.phone);
    setEditedCpf(employee.cpf);
    setEditedPassword(employee.password);
    setEditedRole(employee.role);
  }, [employee]);

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const roleOptions = [
    { value: 'ADMINISTRADOR', label: 'ADMINISTRADOR' },
    { value: 'COZINHEIRO', label: 'COZINHEIRO' },
    { value: 'ENTREGADOR', label: 'ENTREGADOR' }
  ];

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

  const handleConfirmDelete = async () => {
    try {
      await deleteEmployee(employee.id);
      setNotification({ message: 'Removido com sucesso!', type: 'success' });
      setTimeout(() => setNotification({ message: '', type: '' }), 2000);
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      setNotification({ message: 'Erro ao remover!', type: 'error' });
      setTimeout(() => setNotification({ message: '', type: '' }), 2000);
    }
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleSaveChanges = async () => {
    const updatedEmployee = {
      ...employee,
      name: editedName,
      email: editedEmail,
      gender: editedGender,
      birthDate: editedBirthDate,
      phone: editedPhone,
      cpf: editedCpf,
      password: editedPassword,
      role: editedRole,
    };
    try {
      await updateEmployee(updatedEmployee);
      setNotification({ message: 'Alterado com sucesso!', type: 'success' });
      setTimeout(() => setNotification({ message: '', type: '' }), 2000);
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      setNotification({ message: 'Erro ao alterar!', type: 'error' });
      setTimeout(() => setNotification({ message: '', type: '' }), 2000);
    }
  };

  const handleRoleChange = (selectedOption) => {
    setEditedRole(selectedOption.value);
  };

  return (
    <div className="screen">
      <div className="box">
        <h2>Edit Employee</h2>
        <div className="list-info">
          <div className="flex-col class">
            <span>Name:</span>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>
          <div className="flex-col class">
            <span>Email:</span>
            <input
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </div>
          <div className="flex-col class">
            <span>Gender:</span>
            <input
              type="text"
              value={editedGender}
              onChange={(e) => setEditedGender(e.target.value)}
            />
          </div>
          <div className="flex-col class">
            <span>Birth Date:</span>
            <input
              type="date"
              value={editedBirthDate}
              onChange={(e) => setEditedBirthDate(e.target.value)}
            />
          </div>
          <div className="flex-col class">
            <span>Phone:</span>
            <input
              type="text"
              value={editedPhone}
              onChange={(e) => setEditedPhone(e.target.value)}
            />
          </div>
          <div className="flex-col class">
            <span>CPF:</span>
            <input
              type="text"
              value={editedCpf}
              onChange={(e) => setEditedCpf(e.target.value)}
            />
          </div>
          {/* <div className="flex-col class">
            <span>Password:</span>
            <input
              type="password"
              value={editedPassword}
              onChange={(e) => setEditedPassword(e.target.value)}
            />
          </div> */}
          <div className="flex-col class">
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
              <p>Deseja excluir o funcionario?</p>
              <div className="list-button">
                <button className="btn" onClick={handleConfirmDelete}>Sim</button>
                <button className="btn" onClick={handleCancelDelete}>Não</button>
              </div>
            </div>
          </div>
        )}
        {notification.message && (
                        <div className={`notification ${notification.type}`}>
                            {notification.message}
                        </div>
                    )}
      </div>
    </div>
  );
};

export default AlterEmployees;
