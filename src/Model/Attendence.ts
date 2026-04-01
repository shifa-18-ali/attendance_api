import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: String },
  checkIn: { type: Date },
  checkOut: { type: Date }
});

export default mongoose.model("Attendance", attendanceSchema);
