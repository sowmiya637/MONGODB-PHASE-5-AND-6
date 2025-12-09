import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["student", "instructor"], required: true }
});

// Phase-5 Indexes
userSchema.index({ email: 1 }, { unique: true }); // UNIQUE
userSchema.index({ role: 1, email: 1 });          // COMPOUND

export default mongoose.model("User", userSchema);
