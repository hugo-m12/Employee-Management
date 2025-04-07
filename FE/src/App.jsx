import React from 'react';
import { Route, useLocation } from "wouter"; 
import CreateEmployeeView from "./views/CreateEmployeeView";
import HomeView from "./views/Home";
import Footer from "./components/Footer";
import AdminView from "./views/AdminView";
import EditEmployeeView from "./views/EditEmployeeView";
import Header from "./components/Header";
import LoginView from "./views/LoginView";

function App() {
  const [location] = useLocation();  
  
  return (
    <>
      {location !== "/" && <Header />}  
      
      <Route exact path="/" component={LoginView} />
      <Route exact path="/Home" component={HomeView} />
      <Route path="/Admin" component={AdminView} />
      <Route path="/CreateEmployee" component={CreateEmployeeView} />
      <Route path="/EditEmployee/:_id" component={EditEmployeeView} />
      
      <Footer />
    </>
  );
}

export default App;