import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Course from "../models/Course.js";

dotenv.config();

const local = process.env.LOCAL_DB || "mongodb://localhost:27017/phase5db";
const atlas = process.env.ATLAS_DB || "";
const use = (process.env.USE_DB || "local").toLowerCase();

const uri = use === "atlas" && atlas ? atlas : local;

async function runPhase5() {
  await mongoose.connect(uri, { dbName: "phase5db" });

  console.log(`\nConnected to MongoDB (${use})\n`);

  // Clear existing data
  await User.deleteMany({});
  await Course.deleteMany({});

  //  INSERT 1000 USERS
  const usersArr = [];
  for (let i = 1; i <= 1000; i++) {
    usersArr.push({
      name: `User${i}`,
      email: `u${i}@mail.com`,
      role: i % 5 === 0 ? "instructor" : "student" // ~20% instructors
    });
  }
  await User.insertMany(usersArr);
  console.log("Inserted 1000 users\n");

  //  PICK INSTRUCTORS 
  const instructors = await User.find({ role: "instructor" });

  //  INSERT 20+ COURSES 
  const coursesArr = [];
  for (let i = 1; i <= 25; i++) { // 25 courses
    const randomInstructor = instructors[Math.floor(Math.random() * instructors.length)];
    coursesArr.push({
      title: `Course ${i}`,
      description: `Description for course ${i}`,
      category: i % 2 === 0 ? "programming" : "database",
      instructor: randomInstructor._id,
      lessons: [
        { title: "Lesson 1", content: "Content 1", duration: Math.floor(Math.random() * 20) + 10 },
        { title: "Lesson 2", content: "Content 2", duration: Math.floor(Math.random() * 30) + 10 },
        { title: "Lesson 3", content: "Content 3", duration: Math.floor(Math.random() * 40) + 10 }
      ]
    });
  }

  await Course.insertMany(coursesArr);
  console.log("Inserted 25 courses\n");

  //  CREATE INDEXES 
  await User.collection.createIndex({ email: 1 }, { unique: true });
  await User.collection.createIndex({ role: 1 });
  await Course.collection.createIndex({ category: 1 });
  console.log("Indexes created on email, role, and category\n");

  //  PERFORMANCE TEST 
  console.time("Query by email");
  await User.find({ email: "u10@mail.com" });
  console.timeEnd("Query by email");

  console.time("Query by role");
  await User.find({ role: "student" });
  console.timeEnd("Query by role");

  console.log("\nPhase-5 Completed!\n");
  process.exit();
}

runPhase5().catch(err => {
  console.error(err);
  process.exit(1);
});
