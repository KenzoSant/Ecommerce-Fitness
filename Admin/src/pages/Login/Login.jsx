import React, { useState, useContext } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';
import { AdmContext } from '../../context/AdmContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { loginAdmin } = useContext(AdmContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await loginAdmin(email, password);
            setError('');
            navigate('/list'); // Redireciona para a lista após o login bem-sucedido
        } catch (error) {
            setError('Email ou senha inválidos');
        }
    };

    return (
        <div className="login">
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        placeholder="Digite seu email"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Senha:</label>
                    <input
                        placeholder="Digite sua senha"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <p className="error">{error}</p>}

                    <button type="submit">Entrar</button>
                </form>
            </div>
            <div className="login-img">
                <img src={assets.login_img} alt="Login" />
                <div className="overlay">
                    <p>FITFOOD.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
