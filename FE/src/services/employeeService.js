const url = "http://localhost:3000/api"
async function getAllEmployees() { 
    try {
        const response = await fetch(`${url}/employees`);
        const result = await response.json();
        return(result);

    } catch (error) {
        console.error("Error fetching all employees:" + error); 
        return [];
    }
  }

  async function getEmployeeById(id) { 
    try {
        const response = await fetch(`${url}/employees/${id}`);
        const result = await response.json();
        return(result);

    } catch (error) {
        console.error("Error fetching employee " + error); 
        return [];
    }
  }

  async function createEmployee(data) {
    try {
      const response = await fetch(`${url}/employees/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error Creating employee:", error);
      throw error; 
    }
  }

  async function updateEmployeeById(id, data) {
    try {
      const response = await fetch(`${url}/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error Creating employee:", error);
      throw error; 
    }
  }


  async function deleteEmployeeById(id) {
    try {
      const response = await fetch(`${url}/employees/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error; 
    }
  }

  
  export default {
    getAllEmployees,
    deleteEmployeeById,
    createEmployee,
    updateEmployeeById,
    getEmployeeById
}