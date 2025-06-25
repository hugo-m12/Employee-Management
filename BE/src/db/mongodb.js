const dotenv = require ('dotenv');
const { MongoClient } = require('mongodb')

dotenv.config();
//const url = "mongodb+srv://hugom:vScsYyvFZbTu0Qyv@cluster0.d3haq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const url = process.env.MONGODB_URL

const client = new MongoClient(url)
const db = client.db('employees_db')

module.exports = db