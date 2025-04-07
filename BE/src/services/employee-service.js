const { ObjectId } = require('mongodb')
const db = require('../db/mongodb')
const employees = db.collection('employees')

async function findAllEmployees() {
	const result = employees.find().toArray()
	return result
}

async function findEmployeeById(id) {
	const result = employees.findOne({
		_id: new ObjectId(id),
	})
	return result
}

async function createEmployee(employeeData) { 
	const result = employees.insertOne({
		name: employeeData.name,
		type: employeeData.type,
        email: employeeData.email,
        phone: employeeData.phone,
        role: employeeData.role,
        password: employeeData.password,
        vacationDays: employeeData.vacationDays
	})

	return result
}

async function updateEmployeeById(id, employeeData) {
    const filter = { _id: new ObjectId(id) }
	const result = employees.updateOne(filter,
		{
			$set: {
				name: employeeData.name,
				type: employeeData.type,
                email: employeeData.email,
                phone: employeeData.phone,
                role: employeeData.role, 
                password: employeeData.password,
                vacationDays: employeeData.vacationDays
			},
		}
	)

	return result
}

async function deleteEmployeeById(id) {
	const result = employees.deleteOne({
		_id: new ObjectId(id),
	})
	return result
}

module.exports = {
	findAllEmployees,
    findEmployeeById,
	createEmployee,
	updateEmployeeById,
	deleteEmployeeById,
}