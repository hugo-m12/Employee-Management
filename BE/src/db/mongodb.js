const { MongoClient } = require('mongodb')

const url = "mongodb+srv://hugom:vScsYyvFZbTu0Qyv@cluster0.d3haq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(url)
const db = client.db('employees_db')

module.exports = db