import React, { useState, useContext } from 'react';
import './AddEmployees.css';
import { AdmContext } from "../../context/AdmContext";

const AddEmployees = () => {
    const { registerEmployee } = useContext(AdmContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sexo, setSexo] = useState('');
    const [datanasc, setDatanasc] = useState('');
    const [tel, setTel] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await registerEmployee({ name, email, password, role });
            setSuccess('Usuário cadastrado com sucesso!');
            setError('');
        } catch (error) {
            setError('Erro ao cadastrar usuário');
            setSuccess('');
        }
    };

    return (
        <div className="add-employees">
            <h1>Cadastrar Funcionário</h1>
            <form onSubmit={handleSubmit}>
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
                <label htmlFor="sexo">Sexo:</label>
                <input
                    placeholder="Digite o sexo"
                    type="text"
                    id="sexo"
                    name="sexo"
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                    required
                />
                <label htmlFor="datanasc">Data Nascimento:</label>
                <input
                    placeholder="Digite a data de nasc."
                    type="date"
                    id="datanasc"
                    name="datanasc"
                    value={datanasc}
                    onChange={(e) => setDatanasc(e.target.value)}
                    required
                />
                <label htmlFor="tel">Telefone:</label>
                <input
                    placeholder="Digite o telefone."
                    type="number"
                    id="tel"
                    name="tel"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    required
                />
                <input
                    placeholder="Digite o CPF."
                    type="number"
                    id="cpf"
                    name="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                />
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
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default AddEmployees;
