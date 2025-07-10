import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import CalendarComponent from "../components/CalendarComponent";
import toast from "react-hot-toast";
import employeeService from "../services/employeeService";
import fetchService from "../services/fetchService";

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
  const [, setError] = useState(null);
  const url = "https://employee-managementbe.onrender.com";
  const params = useParams();

  useEffect(function () {
        (async function () {
          const data = await fetchService.get(`${url}/admin`, true);
          if (!data) {
            window.location = "/";
          }
        })();
      }, []);

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

      toast.success("Employee was updated successfully!", {
          duration: 3000,
          position: "top-right",
        });

    } catch {
      setError(toast.error("Failed to update Employee", {
          duration: 3000,
          position: "top-right",
        }));
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
        <select 
            disabled
            required
            name="type"
            value={employee.type}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
          <option value="">Select type</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
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

      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Vacation Days</h3>
          <FontAwesomeIcon
                className="mr-3"
                icon={faCalendarDays}
                />
          <CalendarComponent
            employee={employee}
            onVacationDaysChange={handleVacationDaysChange}
            />
          {employee.vacationDays?.length > 0 ? (
            <p className="text-lg text-gray-600 mt-4">{employee.vacationDays.length} Vacation Days Selected</p>
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