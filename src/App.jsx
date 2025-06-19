// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RelatorioSelecao from './components/RelatorioSelecao';
import AdminPanel from './components/AdminPanel'; 
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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
          element={
            isLoggedIn ? 
              <AdminPanel onLogout={handleLogout} /> : 
              <Navigate to="/login" replace />
          }
        />
        <Route 
          path="/relatorio" 
          element={
            isLoggedIn ? 
              <RelatorioSelecao onLogout={handleLogout} /> : 
              <Navigate to="/login" replace />
          }
        />
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} 
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} 
        />
      </Routes>
    </div>
  );
}

export default App;
