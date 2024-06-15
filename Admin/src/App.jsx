import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import ListEmployees from './pages/ListEmployees/ListEmployees';
import Login from './pages/Login/Login';
import PrivateRoute from './context/PrivateRoute';
<<<<<<< Updated upstream
import Dashboard from './pages/Dashboard/Dashboard';
=======
import ListOrders from './pages/ListOrders/ListOrders';
>>>>>>> Stashed changes

const App = () => {
    return (
        <div>
            <hr />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/*"
                    element={
                        <div className="app-content">
                            <Sidebar />
                            <Routes>
                                <Route path='/list' element={<PrivateRoute element={List} />} />
                                <Route path='/list-orders' element={<PrivateRoute element={ListOrders} />} />
                                <Route path='/list-employees' element={<PrivateRoute element={ListEmployees} />} />
                                <Route path='/dashboard' element={<PrivateRoute element={Dashboard} />} />
                                <Route path="*" element={<Navigate to="/list" />} />
                            </Routes>
                        </div>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
