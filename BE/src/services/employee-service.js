const { ObjectId } = require('mongodb')
const db = require('../db/mongodb')
const employees = db.collection('employees')
const argon2 = require("argon2");

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
	const hashedPassword = await argon2.hash(employeeData.password);
	const result = employees.insertOne({
		name: employeeData.name,
		type: employeeData.type,
        email: employeeData.email,
        phone: employeeData.phone,
        role: employeeData.role,
        password: hashedPassword,
        vacationDays: employeeData.vacationDays
	})

	return {
        result,
        hashedPassword
    };
}

async function updateEmployeeById(id, employeeData) {
    const filter = { _id: new ObjectId(id) }
	const hashedPassword = await argon2.hash(employeeData.password);
	const result = employees.updateOne(filter,
		{
			$set: {
				name: employeeData.name,
				type: employeeData.type,
                email: employeeData.email,
                phone: employeeData.phone,
                role: employeeData.role, 
                password: hashedPassword,
                vacationDays: employeeData.vacationDays
			},
		}
	)

	return {
        result,
        hashedPassword
    };
}

async function deleteEmployeeById(id) {
	const result = employees.deleteOne({
		_id: new ObjectId(id),
	})
	return result
}

async function employeeAuth(email, password) {
    const user = await employees.findOne({ email: email });

    if (!user) {
        throw new Error('Employee not found');
    }

    const verified = await argon2.verify(user.password, password);
    
    if (!verified) {
        throw new Error('Invalid password');
    }
    return user;
}

module.exports = {
	findAllEmployees,
    findEmployeeById,
	createEmployee,
	updateEmployeeById,
	deleteEmployeeById,
	employeeAuth
}