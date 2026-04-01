 import mongoose from "mongoose";
 const MONGO_URI = process.env.MONGO_URI as string|| "mongodb+srv://shifa_db_ali12:shifa_18ali@cluster0.hegt8xi.mongodb.net/attendance_db";


export const connectDb=async () : Promise<void> =>{
    
        mongoose.connect( MONGO_URI)
.then(()=>console.log('db connected')) 
.catch((err)=>console.log('error',err))

}