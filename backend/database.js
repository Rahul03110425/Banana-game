require('dotenv').config()
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI 
let dbInstance = null;

async function connectToDatabase() {
  if (!dbInstance) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    dbInstance = client.db(); 
    console.log('Connected to MongoDB');
  }
  return dbInstance;
}

module.exports = { connectToDatabase };
