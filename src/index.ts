
import cors from 'cors'
import express ,{Application} from 'express'
import dotenv from "dotenv";
import authRoutes from './Routes/authRoutes'
import attendanceRoutes from './Routes/attendanceRoutes'
// import translateRoutes from './Routes/translateRoutes'
import dashboardRoutes from './Routes/admin.routes'
const app:Application=express()
import {connectDb} from './config/db'
import faceRoutes from './Routes/face.routes';

dotenv.config();

app.use(cors())
app.use(express.json())
connectDb()

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/face", faceRoutes);
app.use("/api", dashboardRoutes);
// app.use("/api/attendance", attendanceRoutes);
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})