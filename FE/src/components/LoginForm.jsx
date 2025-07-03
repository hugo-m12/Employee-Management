import React from 'react';
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import toast from 'react-hot-toast';
import fetchService from "../services/fetchService";
import storeService from "../services/storeService";

function LoginForm({ onLogin }) {
  const userRef = useRef();
  const errRef = useRef();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await fetchService.post(
        `http://localhost:3000/api/login`,

        {
          email: formData.email,
          password: formData.password,
        }
      );
  
      if (response.token) {

       toast.success('Successfully logged in!', {
          duration: 3000,
          position: 'top-right'
        });

        console.log(response.token)

        storeService.storeToken(response.token);
        if (onLogin) onLogin();
        window.location = "/home";
      } else {
        const errorData = await response.json(); 
        setError(errorData.error || 'Email or Password is Wrong. Please try again.');
      }
    } catch (err) {
      setError('Email or Password is Wrong. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <div className="font-[Poppins] flex justify-center items-center min-h-screen bg-[url(/images/login_background.jpg)] bg-no-repeat bg-cover bg-center">
        <div className="w-[420px] bg-transparent backdrop-blur-2xl text-white p-6 rounded-2xl shadow-lg">
          <form action="" onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-[36px] text-center font-bold tracking-tight">
              Login
            </h1>
            <div className="relative w-full h-[50px] mx-auto border-2 border-gray-200 rounded-2xl overflow-hidden">
              <input
                ref={userRef}
                onChange={handleChange}
                name='email'
                value={formData.email}
                autoComplete="off"
                className="absolute inset-0 w-full px-4 py-2 text-center bg-transparent border-none rounded-sm placeholder:text-gray-300"
                type="text"
                placeholder="Email"
                required
              />
              <FontAwesomeIcon
                color="white"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                icon={faUser}
              />
            </div>
            <div className="relative w-full h-[50px] mx-auto border-2 border-gray-200 rounded-2xl overflow-hidden">
              <input
                onChange={handleChange}
                name='password'
                value={formData.password}
                className="absolute inset-0 w-full px-4 py-2 text-center bg-transparent border-none rounded-sm placeholder:text-gray-300"
                type="password"
                placeholder="Password"
                required
              />
              <FontAwesomeIcon
                color="white"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                icon={faLock}
              />
            </div>
            <div className="flex justify-between items-center mx-auto max-w-[280px]">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-white bg-transparent"
                />
                Remember Me
              </label>
              <a href="#" className="text-sm hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              className={`w-full h-[45px] rounded-2xl bg-white hover:bg-purple-100 text-black cursor-pointer transition-colors duration-200 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <div className="text-center">
              <h3
                ref={errRef}
                className={error ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {error}
              </h3>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
