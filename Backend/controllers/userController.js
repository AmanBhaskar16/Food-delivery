import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login user

const loginUser = async (req,res)=>{
  const {email,password} = req.body;
  try {

    // Checking is a user already exists or not

    const user = await userModel.findOne({email});
    if(!user){
      return res.json({
        success:"false",
        message:"User does not exist"
      })
    }

    // Checking whether password is valid or not
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.json({
        success:false,
        message:"Invalid credentials"
      })
    }

    // Creating token for the user if both matches
    const token = createToken(user._id);
    res.json({
      success:true,
      token
    })

  } catch (error) {
    console.log(error);
    res.json({
      success:false,
      message:"Error"
    })
  }
}

// Create token

const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET);
}

// Register User

const registerUser = async (req,res)=>{
  const {name,password,email} = req.body;
  try {
    // Checking if a user already exists or not
    const exists = await userModel.findOne({email});

    if(exists){
      return res.json({
        success:false,
        message:"User already exists"
      })
    }

    // Validating email format & strong password
    if(!validator.isEmail(email)){
      return res.json({
        success:false,
        message:"Please enter a valid email"
      })
    }

    if (password.length<8) {
      res.json({
        success:false,
        message:"Please enter a strong password"
      })
    }

    // Encrypting user password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    // Creating new user
    const newUser = new userModel({
      name : name,
      email: email,
      password : hashedPassword
    });

    const user = await newUser.save();
    
    const token = createToken(user._id);

    res.json({
      success:true,token
    });

  } catch (error) {
    console.log(error);
    res.json({
      success:false,
      message:"Error"
    })
  }
}

export {loginUser,registerUser}