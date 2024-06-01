import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AdmContext } from './AdmContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { isLoggedIn } = useContext(AdmContext);
    return isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
