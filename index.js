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

// API for HomePage
app.get("/", async function (req, res) {
  res.send(`Welcome to Student-Mentor API`);
});

// API for get all list of student
app.get("/allstudent", async function (req, res) {
  const data = await client
    .db("Class")
    .collection("students")
    .find({})
    .toArray();
  res.send(data);
});

// API for get all list of Mentor
app.get("/allmentor", async function (req, res) {
  const data = await client
    .db("Class")
    .collection("mentors")
    .find({})
    .toArray();
  res.send(data);
});

// API for create new student
app.post("/createstudent", async function (req, res) {
  // get data from request body
  const data = req.body;

  // query for inset one student into student database.
  const result = await client
    .db("Class")
    .collection("students")
    .insertOne(data);

  res.send(result);
});

// API for create new Mentor
app.post("/creatementor", async function (req, res) {
  // get data from request body
  const data = req.body;

  // query for inset one Mentor into student database.
  const result = await client.db("Class").collection("mentor").insertOne(data);

  res.send(result);
});

// API for Assign student to Mentor
app.put("/assignstudent/:id", async function (req, res) {
  let mentorId = ObjectId(req.params);
  let data = req.body.students;

  for (let i = 0; i < data.length; i++) {
    let id = ObjectId(data[i]);
    data[i] = id;
  }
  console.log(data);

  const result = await client
    .db("Class")
    .collection("mentors")
    .updateMany({ _id: mentorId }, { $set: { students: data } });

  res.send(result);
});

//API for assign or change Mentor for perticular student
app.put("/assignmentor/:id", async function (req, res) {
  let studentID = ObjectId(req.params.id);
  let mentorID = ObjectId(req.body.mentorID);

  const result = await client
    .db("Class")
    .collection("students")
    .updateOne({ _id: studentID }, { $set: { mentor: mentorID } });

  res.send(result);
});

//API for all student for one mentor
app.get("/allstudentofmentor/:id", async function (req, res) {

  let MentorID = ObjectId(req.params.id);

  const data = await client
    .db("Class")
    .collection("mentors")
    .findOne({ _id: MentorID }, { projection: { _id: 0, students: 1 } });

  res.send(data);
});
// db.students.find({_id : ObjectId("63dd61cf31567606dcf6b2ee")},{_id : 0,"student_name": 1})
