import { Request, Response } from "express";
import User, { IUser } from "../Model/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ============================
   REGISTER ADMIN
   (NO FACE REQUIRED)
============================ */
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, branch } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      branch,
      role: "admin",
    });

    return res.status(201).json({
      message: "Admin registered successfully",
      admin,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/* ============================
   REGISTER EMPLOYEE
   (FACE REQUIRED)
============================ */
export const registerEmployee = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      branch,
        proof,
      designation,
      dob,
    contact,
      address,
      faceEmbedding,
    } = req.body;

    if (!name || !email || !password || !faceEmbedding) {
      return res
        .status(400)
        .json({ message: "All fields and face data are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await User.create({
      name,
      email,
      password: hashedPassword,
      branch,
      designation,
      dob,
      proof,
      contact,
      address,
      faceEmbedding,
      role: "employee",
    });

    return res.status(201).json({
      message: "Employee registered successfully",
      employee,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/* ============================
   LOGIN (ADMIN + EMPLOYEE)
============================ */

/*
====================================
 LOGIN CONTROLLER (ADMIN + EMPLOYEE)
====================================
*/
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // ✅ Fetch user from DB
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Password compare (NO TS ERROR)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Unknown error" });
  }
};
