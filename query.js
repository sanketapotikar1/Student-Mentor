// Query for Student-Mentor API

import { ObjectId } from "mongodb";

// Insert Data into student database
db.students.insertMany([
  {
    student_name: "Sanket Apotikar",
    student_mobile: "9011437740",
    student_email: "sanket@test.com",
  },
  {
    student_name: "Vaibhav Bundile",
    student_mobile: "8515437740",
    student_email: "Vaibhav@test.com",
  },
  {
    student_name: "Shubham Ballal",
    student_mobile: "7845123698",
    student_email: "shubham@test.com",
  },
]);

// Insert Data into Mentor database

db.mentors.insertMany([
  {
    Mentor_name: "Harshal Anjanwatikar",
    Mentor_mobile: "8485237740",
    Mentor_email: "harshal@test.com",
  },
  {
    Mentor_name: "Balaji Devkar",
    Mentor_mobile: "9485264520",
    Mentor_email: "Balaji@test.com",
  },
]);

//query for update students list in mentor databasse.
db.mentors.updateOne(
  { _id: ObjectId("63dd61da31567606dcf6b2f0") },
  {
    $set: {
      students: ["63dd61cf31567606dcf6b2ed", "63dd61cf31567606dcf6b2ee"],
    },
  }
);

// query for update Mentor for perticular student
db.students.updateOne(
  {
    _id: ObjectId("63dd61cf31567606dcf6b2ef"),
  },
  {
    $set: { mentor: ObjectId("63dd61da31567606dcf6b2f1") },
  }
);

// lookup query for get all student list for perticular mentor
db.mentors.aggregate([
  {
    $lookup: {
      from: "students",
      localField: "_id",
      foreignField: "mentor",
      as: "student_list",
    },
  },
  {
    $unwind: "$student_list",
  },
  {
    $project: {
      _id: 0,
      "student_list.student_name": 1,
    },
  },
]);
