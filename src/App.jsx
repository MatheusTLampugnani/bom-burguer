// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import LoginForm from './components/LoginForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUserRole(user.role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <AdminPanel userRole={userRole} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={<Navigate to="/login" replace />} 
        />
      </Routes>
    </div>
  );
}

export default App;