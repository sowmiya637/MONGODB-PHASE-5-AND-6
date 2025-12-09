import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// Create course
router.post("/", async (req, res) => {
  const course = await Course.create(req.body);
  res.json(course);
});

// Get all courses
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Delete course (cascading)
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    await course.deleteOne();

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
