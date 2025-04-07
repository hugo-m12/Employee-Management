const router = require('express').Router()

const employeeController = require('../controllers/employee-controller')
const validateEmployeeData = require('../middleware/employeeData-validation')
const validateId = require('../middleware/validate-id')

router.get('/employees/', employeeController.findAllEmployees)
router.get('/employees/:id', validateId, employeeController.findEmployeeById)
router.post('/employees/', validateEmployeeData, employeeController.createEmployee)
router.put('/employees/:id', validateId, validateEmployeeData, employeeController.updateEmployeeById)
router.delete('/employees/:id', validateId, employeeController.deleteEmployeeById)
router.post('/login', employeeController.employeeAuth)

module.exports = router