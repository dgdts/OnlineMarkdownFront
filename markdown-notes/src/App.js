import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import Home from './pages/Home/Home';
import Editor from './pages/Editor';
import Register from './pages/Register/Register.tsx';
import Login from './pages/Login/Login.tsx';
import RegisterSuccess from './pages/Register/RegisterSuccess';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:id" element={<Editor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-success" element={<RegisterSuccess />} />
      </Routes>
    </AuthProvider>
  );
}

export default App; 