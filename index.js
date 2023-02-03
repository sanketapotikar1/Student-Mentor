// API Main File

import express from "express";
import { MongoClient, ObjectId } from "mongodb";

// PORT declaration
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware function for JSON data
app.use(express.json());

// Local Mongodb URL
const MONGO_URL = `mongodb://127.0.0.1`; // node.js - 16 +

//code for Mongo connection
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log(`Mongo is Connected`);
  return client;
}

const client = await createConnection();

//server listen on Port number
app.listen(PORT, () => {
  console.log(`Server is Running at ${PORT}`);
});
