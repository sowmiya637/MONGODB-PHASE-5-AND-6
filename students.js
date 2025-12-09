import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// Create student
router.post("/", async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
});

// Get all students
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

export default router;
