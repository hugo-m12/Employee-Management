const validator = require('validator')

function validate(body) {
	const { email, name } = body

	if (!email || !name) {
		return false
	}

	if (!validator.isEmail(email)) {
		return false
	}

	if (!validator.matches(name, /^[a-z0-9 ]+$/i)) {
		return false
	}

	return true
}

function validateUserBody(req, res, next) {
	if (!validate(req.body)) {
		res.status(400).end()
		return
	}
	next()
}

module.exports = validateUserBody