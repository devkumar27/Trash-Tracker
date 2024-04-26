import Admin from "../Models/adminModel.js";
import User from "../Models/userModel.js";
import { createSecretToken } from "../util/SecretToken.js";
import bcrypt from "bcrypt";

export const Signup = async (req, res, next) => {
  try {
    const { email, password, firstname, lastname, address, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, firstname, lastname, address, createdAt });
    // const token = createSecretToken(user._id);
    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    // });
    res
      .status(201)
      .json({ message: "User registered successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

export const AdminSignup = async (req, res, next) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.json({ message: "Admin already exists" });
    }
    const newAdmin = await Admin.create({ email, password, firstname, lastname });
    // const token = createSecretToken(user._id);
    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    // });
    res
      .status(201)
      .json({ message: "Admin registered successfully", success: true, newAdmin });
    next();
  } catch (error) {

    console.error(error);
  }
};

export const Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      const admin = await Admin.findOne({ email });
      if(!user && !admin){
        return res.json({message:'Incorrect password or email' }) 
      }
      if(user) {
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
          return res.json({message:'Incorrect password or email' }) 
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: true,
          sameSite: secure ? 'None' : 'Lax',
        });
        res.status(201).json({ message: "User logged in successfully", success: true });
      } else if(admin) {
        const auth = await bcrypt.compare(password, admin.password)
        if (!auth) {
          return res.json({message:'Incorrect password or email' }) 
        }
        const token = createSecretToken(admin._id);
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: true,
          sameSite: secure ? 'None' : 'Lax',
        });
        res.status(201).json({ message: "Admin logged in successfully", success: true });
      }
      next()
    } catch (error) {
      console.error(error);
    }
  };