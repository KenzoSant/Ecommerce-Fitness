import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Sign Up");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const { registerUser, loginUser } = useContext(StoreContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error message
        if (currState === "Sign Up") {
            try {
                await registerUser({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                });
                setShowLogin(false);
            } catch (error) {
                console.error('Error during registration:', error);
                setError('Erro ao cadastrar. Tente novamente');
            }
        } else {
            try {
                await loginUser(formData.email, formData.password);
                setShowLogin(false);
            } catch (error) {
                console.error('Error during login:', error);
                setError('Email e/ou Senha inválidos. Tente novamente');
            }
        }
    };

    return (
        <div className="login-popup">
            <form className="login-popup-container" onSubmit={handleSubmit}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? null : (
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button className="button-func" type="submit">
                    {currState === "Sign Up" ? "Cadastrar" : "Entrar"}
                </button>
                {currState === "Login" ? null : (
                    <div className="login-popup-condition">
                        <input type="checkbox" name="checkbox" required />
                        <p>Concordo com os termos de uso e política de privacidade.</p>
                    </div>
                )}
                {currState === "Login" ? (
                    <p>Criar uma conta? <span onClick={() => setCurrState("Sign Up")}>Clique aqui</span></p>
                ) : (
                    <p>Já possui uma conta? <span onClick={() => setCurrState("Login")}>Login aqui</span></p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
