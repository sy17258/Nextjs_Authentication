import { error } from "console";
import Mongoose from "mongoose";

export async function connect(){
    try{
        Mongoose.connect(process.env.MONGODB_URI!);
        const connection = Mongoose.connection;

        connection.on("connected", ()=>{
            console.log("MongoDB connected successfully");
        })

        connection.on('error', (err) =>{
            console.log('MongoDB connection failed: ' + err);
            process.exit();
        })
    } catch(error){
        console.log(error);
        console.log("Could not connect to DB");
    }   
}