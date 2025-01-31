import mongoose from "mongoose";
import config from "../config/config.js";

export default function connect (){
    mongoose.connect(config.MONGO_URI)
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((error)=>{
        console.log(error);
    })
}