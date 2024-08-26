import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Steps from './components/Steps';
import Info from './components/Info';
import HelpDesk from './components/HelpDesk';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import Details from './components/Details';
import ApplyOnline from './components/apply/ApplyOnline';
import Application from './components/apply/Application';
import UploadDocs from './components/apply/UploadDocs';
import Documents from './components/apply/Documents';
import Payment from './components/apply/Payment';
import PayMethod from './components/apply/PayMethod';
import Successful from './components/apply/Successful';
import { AuthProvider, useAuth } from './context/AuthContext';

import './App.css';

function AppRoutes() {
  const { checkUser, isAuthenticated } = useAuth();

  useEffect(() => {
    checkUser(); // Check if user is logged in when the app starts
  }, [checkUser]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={!isAuthenticated ? <><Hero /><Steps /><Info /><HelpDesk /><FAQ /></> : <Navigate to="/welcome" replace />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/welcome" replace />} />
      <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/welcome" replace />} />
      
      {/* Protected Routes */}
      <Route path="/welcome" element={isAuthenticated ? <Welcome /> : <Navigate to="/login" replace />} />
      <Route path="/details" element={isAuthenticated ? <Details /> : <Navigate to="/login" replace />} />
      <Route path="/apply" element={isAuthenticated ? <ApplyOnline /> : <Navigate to="/login" replace />} />
      <Route path="/application" element={isAuthenticated ? <Application /> : <Navigate to="/login" replace />} />
      <Route path="/upload" element={isAuthenticated ? <UploadDocs /> : <Navigate to="/login" replace />} />
      <Route path="/upload/docs" element={isAuthenticated ? <Documents /> : <Navigate to="/login" replace />} />
      <Route path="/payment" element={isAuthenticated ? <Payment /> : <Navigate to="/login" replace />} />
      <Route path="/payment/method" element={isAuthenticated ? <PayMethod /> : <Navigate to="/login" replace />} />
      <Route path="/payment/success" element={isAuthenticated ? <Successful /> : <Navigate to="/login" replace />} />

      {/* Catch-all Route */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/welcome" : "/login"} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
