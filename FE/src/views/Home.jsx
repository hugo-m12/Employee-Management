import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "wouter";
import employeeService from "../services/employeeService";

function HomeView() {
  const [employees, setEmployees] = useState([]);

  useEffect(function () {
    (async function () {
      const result = await employeeService.getAllEmployees();
      setEmployees(result);
    })();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-sky-200 to-blue-400">
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
      <h3 className="text-center text-4xl font-bold mb-5">Welcome User</h3>
          <table className="table-auto w-full text-center border-collapse border border-gray-300 rounded-lg">
            <thead className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300">Name</th>
                <th className="py-3 px-4 border-b border-gray-300">Email</th>
                <th className="py-3 px-4 border-b border-gray-300">Role</th>
                <th className="py-3 px-4 border-b border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((value) => (
                <tr className="hover:bg-gray-200" key={value._id}>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {value.name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {value.email}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {value.role}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <Link
                      href={`/EditEmployee/${value._id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default HomeView;
