import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "wouter";
import CalendarComponent from "../components/Calendar";
import employeeService from "../services/employeeService";

function EditEmployeeView() {
  const [employee, setEmployee] = useState({
    name: "",
    type: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    vacationDays: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const params = useParams();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const data = await employeeService.getEmployeeById(params._id);
        setEmployee(data);
      } catch (error) {
        setError(error.message || "Failed to fetch employee");
      }
    };
    if (params._id) {
      fetchEmployeeData();
    }
  }, [params._id]);

  const handleVacationDaysChange = (newVacationDays) => {
    setEmployee((prev) => ({
      ...prev,
      vacationDays: newVacationDays,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await employeeService.updateEmployeeById(params._id, employee);
      setSuccessMessage(`Employee was updated successfully!`);
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    } catch (error) {
      setError(error.message || "Failed to update employee");
    } finally {
      setLoading(false);
    }
  };

  if (!params._id) {
    return <div className="text-center text-xl text-red-500 mt-10">Employee not Found!</div>;
  }

  return (
    <>
      <h1 className="text-4xl text-center font-semibold text-gray-700 mt-10 mb-4">Edit Employee</h1>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {successMessage && (
        <div className="text-green-500 text-center mb-4 font-medium">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg space-y-6">
        <div className="space-y-4">
          <input
            required
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Name"
          />
          <input
            required
            name="type"
            value={employee.type}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type"
          />
          <input
            required
            name="email"
            value={employee.email}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Email"
          />
          <input
            type="password"
            required
            name="password"
            value={employee.password}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Password"
          />
          <input
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Phone"
          />
          <input
            required
            name="role"
            value={employee.role}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Role"
          />
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-700">Vacation Days</h3>
          <CalendarComponent
            employee={employee}
            onVacationDaysChange={handleVacationDaysChange}
          />
          {employee.vacationDays?.length > 0 ? (
            <p className="text-lg text-gray-600 mt-2">{employee.vacationDays.length} Vacation Days Selected</p>
          ) : (
            <p className="text-lg text-gray-600 mt-2">No Vacation Days Selected</p>
          )}
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
                Updating...
              </span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
      <div className="mb-[27px]"></div>
    </>
  );
}

export default EditEmployeeView;