import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import AddEmployees from './pages/AddEmployees/AddEmployees';
import ListEmployees from './pages/ListEmployees/ListEmployees';
import Login from './pages/Login/Login';
import PrivateRoute from './context/PrivateRoute';

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
                                <Route path='/orders' element={<PrivateRoute element={Orders} />} />
                                <Route path='/add-employees' element={<PrivateRoute element={AddEmployees} />} />
                                <Route path='/list-employees' element={<PrivateRoute element={ListEmployees} />} />
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
