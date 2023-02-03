// Query for Student-Mentor API


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
