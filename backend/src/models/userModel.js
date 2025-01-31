import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../config/config.js";

const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minlength: [3, "Username must be at least 3 characters long"]
  },
  email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
  },
  password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"]
  },
  role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
  },
  subscriptions: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subscription"
      }
  ]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})



userSchema.methods.comparePassword = async function (userpassword){
    return bcrypt.compare(userpassword, this.password)
}

userSchema.methods.generateToken = function() {
    try {
      const payload = {
        email: this.email,
        id: this._id,
        role: this.role
      }
  
      const token = jwt.sign(payload, config.JWT_SECRET,{ expiresIn: "1d" });
      return token
    } catch (error) {
      console.log(error);
    }
  }

userSchema.statics.checkToken = async(token)=>{
    try {
        const payload = jwt.verify(token, config.JWT_SECRET);
        return payload
    } catch (error) {
        console.log(error);
    }
}


const userModel = mongoose.model('User', userSchema);

export default userModel