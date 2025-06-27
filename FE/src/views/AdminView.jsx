import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useConfirm } from "material-ui-confirm";
import toast from "react-hot-toast";
import employeeService from "../services/employeeService";

function AdminView() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const confirm = useConfirm();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await employeeService.getAllEmployees();
        setEmployees(result);
      } catch (error) {
        setError(`Failed to fetch employees ${error}`);
      }
    };
    fetchEmployees();
  }, []);

  async function handleDelete(id) {
    try {
      const { confirmed, reason } = await confirm({
        title: "Are you sure you want to delete this Employee?",
        description: "This will delete this employee's data permanently",
        
      });

      if (confirmed) {
        setLoading(true);
        await employeeService.deleteEmployeeById(id);

        toast.success("Employee was deleted", {
          duration: 3000,
          position: "top-right",
        });
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp._id !== id)
        );
      } else reason;
    } catch (error) {
      if (error?.message !== "cancel") {
        setError(error.message || "Failed to delete Employee");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-sky-200 to-blue-400">
        <div className="bg-white p-6 rounded-lg shadow-lg w-auto">
          <h3 className="text-center text-4xl font-bold">Admin Panel</h3>
          <div className="flex justify-end mb-4">
            <Link
              href="/CreateEmployee"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Add Employee
            </Link>
          </div>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <table className="table-auto w-full text-center border-collapse border border-gray-300 rounded-lg">
            <thead className="bg-gradient-to-r from-blue-700 via-violet-600 to-amber-500 text-white">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300">Name</th>
                <th className="py-3 px-4 border-b border-gray-300">Email</th>
                <th className="py-3 px-4 border-b border-gray-300">Role</th>
                <th className="py-3 px-4 border-b border-gray-300">Vacation Days</th>
                <th className="py-3 px-4 border-b border-gray-300">Edit</th>
                <th className="py-3 px-4 border-b border-gray-300">Remove</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((value) => (
                <tr className="hover:bg-gray-200" key={value._id}>
                  <td className="py-3 px-4 border-b border-gray-300">{value.name}</td>
                  <td className="py-3 px-4 border-b border-gray-300">{value.email}</td>
                  <td className="py-3 px-4 border-b border-gray-300">{value.role}</td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {value.vacationDays?.length > 0 ? value.vacationDays.length : 'none'}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <Link
                      href={`/EditEmployee/${value._id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <button
                      onClick={() => handleDelete(value._id)}
                      className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                      disabled={loading}
                    >
                      {loading ? 'Deleting...' : 'Remove'}
                    </button>
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

export default AdminView;