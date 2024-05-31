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
                    document: '00000000000001',
                    phone: '00000000001',
                    password: formData.password,
                    type: {
                        id: "1",
                        name: "CLIENTE_NORMAL"
                    }
                });
                setShowLogin(false);
            } catch (error) {
                console.error('Error during registration:', error);
                setError('Error during registration. Please try again.');
            }
        } else {
            try {
                await loginUser(formData.email, formData.password);
                setShowLogin(false);
            } catch (error) {
                console.error('Error during login:', error);
                setError('Invalid email or password. Please try again.');
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
                            placeholder="Name"
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
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button className="button-func" type="submit">
                    {currState === "Sign Up" ? "Create Account" : "Login"}
                </button>
                {currState === "Login" ? null : (
                    <div className="login-popup-condition">
                        <input type="checkbox" name="checkbox" required />
                        <p>I agree to the terms of use & privacy policy.</p>
                    </div>
                )}
                {currState === "Login" ? (
                    <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
