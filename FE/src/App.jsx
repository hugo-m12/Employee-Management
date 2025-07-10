import React from 'react';
import { Route, useLocation } from "wouter";
import { useState } from "react";
import CreateEmployeeView from "./views/CreateEmployeeView";
import HomeView from "./views/Home";
import AdminView from "./views/AdminView";
import EditEmployeeView from "./views/EditEmployeeView";
import Header from './components/header';
import AppFooter from './components/AppFooter';
import LoginView from "./views/LoginView";
import storeService from './services/storeService';
import { ConfirmProvider } from 'material-ui-confirm';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './utils/AuthContext';

function App() {
  const [location] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(storeService.getToken() !== null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    storeService.deleteToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthProvider>
      <ConfirmProvider>
        {location !== "/" && <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
        
        <Route exact path="/" component={LoginView} onLogin={handleLogin} />
        <Route exact path="/home" component={HomeView} />
        <Route path="/Admin" component={AdminView} />
        <Route path="/CreateEmployee" component={CreateEmployeeView} />
        <Route path="/EditEmployee/:_id" component={EditEmployeeView} />
        
        <Toaster />
        <AppFooter />
      </ConfirmProvider>
    </AuthProvider>
  );
}

export default App;