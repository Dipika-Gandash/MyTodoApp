import User from "../models/User.js";
import bcrypt from "bcrypt"
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const Register = async (req, res) => {
    try{
        const {userName, email, password} = req.body;
        if(!userName || !email || !password){
            return res.status(400).json({message: "All fields are required..."})
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exist with this email"});
        }

        const newUser = new User({userName, email, password});
        await newUser.save();

       const token = generateTokenAndSetCookie(newUser,res);

       return res.status(201).json({
            message : "User registered successfully!",
            user : {
                userName : newUser.userName,
                email : newUser.email
            }
        });

    }catch(error){
       return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const Login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message : "Email and Password are required"})
        }

        const user = await User.findOne({email});
        if(!user){
           return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
           return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateTokenAndSetCookie(user, res);

       return res.status(200).json({
            message: "Login successfully",
            user: {userName : user.userName, email : user.email}
        })

    } catch(error){
       return res.status(500).json({ message: "Server Error", error: error.message });
    }
}