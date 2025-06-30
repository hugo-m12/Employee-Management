import React from 'react';
import fetchService from "../services/fetchService";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import employeeService from "../services/employeeService";

function AddEmployeeView() {
  const [employee, setEmployee] = useState({
    name: '',
    type: '',
    email: '',
    password: '',
    phone: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const url = "http://localhost:3000";

  useEffect(function () {
      (async function () {
        const data = await fetchService.get(`${url}/admin`, true);
        if (!data) {
          window.location = "/";
        }
      })();
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await employeeService.createEmployee(employee);
      setEmployee({
        name: '',
        type: '',
        email: '',
        password: '',
        phone: '',
        role: ''
      });
      toast.success("Employee was created", {
          duration: 3000,
          position: "top-right",
        });
    } catch {
      setError(toast.error("Failed to delete Employee", {
          duration: 3000,
          position: "top-right",
        }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl text-center font-semibold text-gray-700 mt-10 mb-4">Create Employee</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg space-y-6">
        <div className="space-y-4">
          <label>Name</label>
          <input
            required
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Name"
            />
          <label>Employee Type</label>
          <input
            required
            name="type"
            value={employee.type}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type"
            />
          <label>Email</label>
          <input
            required
            name="email"
            value={employee.email}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Email"
            />
          <label>Password</label>
          <input
            type="password"
            required
            name="password"
            value={employee.password}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Password"
            />
          <label>Phone</label>
          <input
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Phone"
            />
          <label>Role</label>
          <input
            required
            name="role"
            value={employee.role}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Role"
            />
        </div>

        <div className="flex justify-center">
          <button 
            type="submit"
            className="w-full py-3 mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
            >
            {loading ? (
              <span className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v9m0 0l4-4m-4 4l-4-4"
                    />
                </svg>
                Creating...
              </span>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
      <div className="mb-[143px]"></div>
    </>
  );
}

export default AddEmployeeView;