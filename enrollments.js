import express from "express";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

// Enroll student to course
router.post("/", async (req, res) => {
  const enrollment = await Enrollment.create(req.body);
  res.json(enrollment);
});

// Get enrollments with populated student & course
router.get("/", async (req, res) => {
  const enrollments = await Enrollment.find()
    .populate("student", "name email")
    .populate("course", "title instructor");
  res.json(enrollments);
});

// Nested populate example
router.get("/nested", async (req, res) => {
  const enrollments = await Enrollment.find()
    .populate({
      path: "student",
    })
    .populate({
      path: "course",
    });
  res.json(enrollments);
});

export default router;
