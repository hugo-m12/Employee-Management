const employeeService = require('../services/employee-service')

async function findAllEmployees(req, res) {
	const result = await employeeService.findAllEmployees()
	res.json(result)
}

async function findEmployeeById(req, res) {
	const id = req.params.id

	const result = await employeeService.findEmployeeById(id)

	if (result) {
		res.json(result)
	} else {
		res.status(404).end()
	}
}

async function createEmployee(req, res) {
	const employeeData = req.body

	const result = await employeeService.createEmployee(employeeData)

	if (result) {
		res.json('Employee Created')
	} else {
		res.status(404).end()
	}
}

async function updateEmployeeById(req, res) {
	const id = req.params.id
	const employeeData = req.body

	const result = await employeeService.updateEmployeeById(id, employeeData)

	if (result) {
		res.json('Employee Updated')
	} else {
		res.status(404).end()
	}
}

async function deleteEmployeeById(req, res) {
	const id = req.params.id

	const result = await employeeService.deleteEmployeeById(id)

	if (result.deletedCount == 1) {
		res.json('Employee Deleted')
	} else {
		res.status(404).end()
	}
}

async function employeeAuth(req, res) {
    try {
        const { email, password } = req.body;
        const result = await employeeService.employeeAuth(email, password);
        
        res.json({
            message: 'Login successful',
            data: {
                id: result._id,
                email: result.email
            }
        });
		

    } catch (error) {
        res.status(error.message.includes('Email not found') ? 404 : 401).json({
            error: error.message
        });
    }
}

module.exports = {
	findAllEmployees,
	findEmployeeById,
	createEmployee,
	updateEmployeeById,
	deleteEmployeeById,
	employeeAuth
}