import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String
});

// TEXT SEARCH INDEX (title + description)
courseSchema.index({
  title: "text",
  description: "text"
});

export default mongoose.model("Course", courseSchema);
