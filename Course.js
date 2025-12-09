import mongoose from "mongoose";
import Enrollment from "./Enrollment.js";

const lessonSchema = new mongoose.Schema({
  title: String,
  duration: Number, // in minutes
});

const courseSchema = new mongoose.Schema({
  title: String,
  instructor: String,
  lessons: [lessonSchema], // embedded data
});

//  CASCADING DELETE
courseSchema.pre("deleteOne", { document: true }, async function(next) {
  await Enrollment.deleteMany({ course: this._id });
});

export default mongoose.model("Course", courseSchema);
