const express = require('express')
const cors = require('cors')
const routes = require("./router/routes")

const app = express()

const port = 3000

app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.listen(port, function () {
	console.log(`Listening on ${port}`)
})