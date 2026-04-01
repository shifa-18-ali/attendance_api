import { Request, Response } from "express";
import User from "../Model/UserModel";
import Attendance from "../Model/Attendence";

export const getAdminDashboard = async (req: Request, res: Response) => {
  try {
    // 1️⃣ Total employees
    const totalEmployees = await User.countDocuments({ role: "employee" });

    // 2️⃣ Today's attendance
    const today = new Date().toISOString().split("T")[0];

    const presentToday = await Attendance.countDocuments({ date: today });
    const absentToday = totalEmployees - presentToday;

    // 3️⃣ Employee list
    const employees = await User.find({ role: "employee" }).select(
      "name branch designation"
    );

    return res.json({
      stats: {
        totalEmployees,
        presentToday,
        absentToday,
      },
      employees,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
