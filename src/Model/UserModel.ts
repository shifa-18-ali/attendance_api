import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "employee";
  branch?: string;

  proof?: string;
  designation?: string;
  dob?: string;
  contact?: number;
  address?: string;

  faceEmbedding?: number[];
}

const UserSchema: Schema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  password: {type:String, required:true},
  role: { type: String, enum: ["admin", "employee"], default: "employee" },
  branch: String,
  
  designation: String,
  dob: String,
  contact: Number,
  address: String,
   faceEmbedding: {
    type: [Number],
    required: function () {
      return this.role === "employee";
    },
  }
});

export default mongoose.model("User", UserSchema);
