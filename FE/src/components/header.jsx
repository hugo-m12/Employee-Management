import React from 'react';
import { Link } from "wouter";
import toast from 'react-hot-toast';
import { navigate } from "wouter/use-browser-location";

function Header({ isAuthenticated, onLogout }) {

  const handleLogout = () => {
    if (onLogout) onLogout();
    toast.success("User has logged out", {
      duration: 3000,
      position: 'top-right'
    });
    navigate("/");
  };

  return (
    <header className="text-center">
      <div className="text-white bg-cover bg-center">
        <nav className="hidden md:flex justify-center gap-16 p-7 list-none">
          <li>
            <Link 
              className="text-gray-400 no-underline transition-colors duration-300 hover:text-black hover:underline ml-2"
              href="/Home"
            >
              Home
            </Link>
          </li>
          
          {isAuthenticated && (
            <>
            {/* TODO:if the employee is an admin he can see the panel if not he doesnt have acess*/}
              <li>
                <Link 
                  className="text-gray-400 no-underline transition-colors duration-300 hover:text-black hover:underline ml-2"
                  href="/Admin"
                  >
                  Admin Panel
                </Link>
              </li>
              <li>
                <Link 
                  className="text-gray-400 no-underline transition-colors duration-300 hover:text-black hover:underline ml-2"
                  href="/"
                  onClick={(e) => {
                    e.preventDefault(); 
                    handleLogout();
                  }}
                >
                  Log Out
                </Link>
              </li>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;