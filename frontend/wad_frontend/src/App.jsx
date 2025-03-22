import { useState,useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import {authStore} from './store/useAuthStore';
import {Loader} from 'lucide-react';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = authStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={authUser?<HomePage />:<Navigate to="/login"/>}
        />
        <Route
          path="/signup"
          element={!authUser?<SignUpPage />:<Navigate to="/"/>}
        />
        <Route
          path="/login"
          element={!authUser?<LoginPage />:<Navigate to="/"/>}
        />
      </Routes>
    </div>
  )
}

export default App
