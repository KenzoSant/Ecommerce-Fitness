import React, { useState, useContext } from 'react';
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
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await registerEmployee({ name, gender, birthDate, cpf, email, phone, password, role });
            setSuccess('Usuário cadastrado com sucesso!');
            setTimeout(() => setSuccess(''), 3000);
            setError('');
        } catch (error) {
            setError('Erro ao cadastrar usuário');
            setSuccess('');
        }
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
                        <input
                            placeholder="Digite a função"
                            type="text"
                            id="role"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <button type="submit" className='add-btn'>Cadastrar</button>
                    <button type="button" className='add-btn' onClick={() => setShowAddForm(false)}>Fechar</button>
                </form>
            </div>
        </div>
    );
};

export default AddEmployees;
