import express from "express";
import mongoose from "mongoose";

import studentRoutes from "./routes/students.js";
import courseRoutes from "./routes/courses.js";
import enrollmentRoutes from "./routes/enrollments.js";

const app = express();
app.use(express.json());

// FIXED CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/phase6")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
