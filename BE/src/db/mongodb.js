const dotenv = require ('dotenv');
const { MongoClient } = require('mongodb')

dotenv.config();
const url = process.env.MONGODB_URL

const client = new MongoClient(url)
const db = client.db('employees_db')

module.exports = db