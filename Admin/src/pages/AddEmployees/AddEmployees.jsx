import React, { useState, useContext } from 'react';
import Select from 'react-select';
import './AddEmployees.css';
import { AdmContext } from "../../context/AdmContext";

const AddEmployees = ({ setShowAddForm }) => {
    const { registerEmployee } = useContext(AdmContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await registerEmployee({ name, gender, birthDate, cpf, email, phone, password, role });
            setNotification({ message: 'Cadastrado com sucesso!', type: 'success' });
            setTimeout(() => setNotification({ message: '', type: '' }), 2000);
            setName('');
            setEmail('');
            setGender('');
            setBirthDate('');
            setPhone('');
            setCpf('');
            setPassword('');
            setRole('');
        } catch (error) {
            setNotification({ message: 'Erro ao cadastrar!', type: 'error' });
            setTimeout(() => setNotification({ message: '', type: '' }), 2000);
        }
    };

    const handleRoleChange = (selectedOption) => {
        setRole(selectedOption.value);
    };

    return (
        <div className="screen">
            <div className="box">
                <h2>Cadastrar Funcionário</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex-col class">
                        <label htmlFor="name">Nome:</label>
                        <input
                            placeholder="Digite o nome"
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-col class">
                        <label htmlFor="sexo">Sexo:</label>
                        <input
                            placeholder="Digite o sexo"
                            type="text"
                            id="sexo"
                            name="sexo"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-col class">
                        <label htmlFor="datanasc">Data Nascimento:</label>
                        <input
                            placeholder="Digite a data de nasc."
                            type="date"
                            id="datanasc"
                            name="datanasc"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-col class">
                        <label htmlFor="CPF">CPF:</label>
                        <input
                            placeholder="Digite o CPF."
                            type="number"
                            id="cpf"
                            name="cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-col class">
                        <label htmlFor="email">Email:</label>
                        <input
                            placeholder="Digite o email"
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-col class">
                        <label htmlFor="tel">Telefone:</label>
                        <input
                            placeholder="Digite o telefone."
                            type="number"
                            id="tel"
                            name="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-col class">
                        <label htmlFor="password">Senha:</label>
                        <input
                            placeholder="Digite a senha"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-col class">
                        <label htmlFor="role">Função:</label>
                        <Select
                            value={roleOptions.find(option => option.value === role)}
                            onChange={handleRoleChange}
                            options={roleOptions}
                            styles={customStyles}
                        />
                    </div>
                    {notification.message && (
                        <div className={`notification ${notification.type}`}>
                            {notification.message}
                        </div>
                    )}
                    <button type="submit" className='add-btn'>Cadastrar</button>
                    <button type="button" className='add-btn' onClick={() => setShowAddForm(false)}>Fechar</button>
                </form>
            </div>
        </div>
    );
};

export default AddEmployees;
