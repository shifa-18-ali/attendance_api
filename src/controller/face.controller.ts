import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../Model/UserModel";

export const recognizeFace = async (req: Request, res: Response) => {
  try {
    const { faceEmbedding } = req.body as { faceEmbedding?: number[] };

    if (!faceEmbedding || !Array.isArray(faceEmbedding)) {
      return res.status(400).json({ message: "Face data missing or invalid" });
    }

    const employees: IUser[] = await User.find({ role: "employee" });

    let matchedUser: IUser | null = null;

    for (const user of employees) {
      const storedEmbedding = user.faceEmbedding;
      if (!storedEmbedding) continue;
      if (storedEmbedding.length !== faceEmbedding.length) continue;

      let distance = 0;

      for (let i = 0; i < faceEmbedding.length; i++) {
        distance += Math.abs(storedEmbedding[i] - faceEmbedding[i]);
      }

      if (distance < 0.6) {
        matchedUser = user;
        break;
      }
    }

    if (!matchedUser) {
      return res.status(401).json({ message: "Unauthorized face" });
    }

    const token = jwt.sign(
      { userId: matchedUser._id.toString() },
      process.env.JWT_SECRET as string,
      { expiresIn: "2m" }
    );

    return res.json({
      success: true,
      message: "Face recognized",
      token,
      user: {
        id: matchedUser._id.toString(),
        name: matchedUser.name,
        branch: matchedUser.branch,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Unknown error" });
  }
};
