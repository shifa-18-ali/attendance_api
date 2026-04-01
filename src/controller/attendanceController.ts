import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Attendance from "../Model/Attendence";

/*
================================================
 MARK ATTENDANCE CONTROLLER
================================================
 - Accepts short-lived token from face recognition
 - Marks check-in or check-out
================================================
*/

export const markAttendance = async (req: Request, res: Response) => {
  try {
    const { token } = req.body as { token?: string };

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { userId: string };

    const userId = decoded.userId;

    const today = new Date().toISOString().split("T")[0];

    let record = await Attendance.findOne({ userId, date: today });

    // First time → Check-in
    if (!record) {
      await Attendance.create({
        userId,
        date: today,
        checkIn: new Date(),
      });

      return res.json({ message: "Check-in successful" });
    }

    // Second time → Check-out
    if (!record.checkOut) {
      record.checkOut = new Date();
      await record.save();

      return res.json({ message: "Check-out successful" });
    }

    // Already completed
    return res.json({ message: "Attendance already completed" });
  } catch (error: any) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
