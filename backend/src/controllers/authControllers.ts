import { Request, Response, NextFunction } from "express";
import { LoginSchemaUser, loginUserBody, RegisterSchemaUser, registerUserBody } from "../schemas/authSchema";
import { User } from "../models/authModel";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


const registerUser = async (req: Request<{}, {}, registerUserBody>, res: Response, next: NextFunction): Promise<void> => {
  
  const parseUserData = RegisterSchemaUser.safeParse(req.body)
   if (!parseUserData.success) {
    res.status(400).json({
      success: false,
      message: "Invalid input data",
      error: parseUserData.error.errors
    });
    return;
  }
  
  const { name, password, email } = parseUserData.data

  const existingUser = await User.findOne({
      $or: [{ email }, { name }]
    });
  // db.users.createIndex({ email: 1 }, { unique: true })
  // db.users.createIndex({ name: 1 }, { unique: true })

    if (existingUser) {
      if (existingUser.email === email) {
        res.status(400).json({
          success: false,
          message: "Email is already registered.",
        });
        return
      }

      if (existingUser.name=== name) {
        res.status(400).json({
          success: false,
          message: "Username is already taken.",
        });
        return
      }
    }

  const hashedPassword = await bcryptjs.hash(password, 10)

  try {
    
    const newUser = await new User({ name, email, password: hashedPassword }).save()
    res.status(201).json({
      success: true,
      message: "User successfully registered.",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    })
    return
    
  } catch (error: unknown) {
    // db.users.createIndex({ email: 1 }, { unique: true })
    // db.users.createIndex({ name: 1 }, { unique: true })
    if ((error as any).code === 11000) { 
      res.status(400).json({
        success: false,
        message: "User name or email already registered."
      })
    }
    next(error)
    
  }

 }

const loginUser = async (req: Request<{}, {}, loginUserBody>, res: Response, next: NextFunction): Promise<void> => {
  
  const parseUserLogin = LoginSchemaUser.safeParse(req.body)
  if (!parseUserLogin.success) {
    res.status(400).json({
      success: false,
      message: "Invalid input data",
      error: parseUserLogin.error.errors
    });
    return;
  }

  const { email, password } = parseUserLogin.data
  
  try {

    // usuario existente?

    const logUser = await User.findOne({ email });
    if (!logUser) {
      console.error("Unauthorized user")
      res.status(401).json({
      success: false,
      message: "Unauthorized user"
    });
    return
    }
    
    // validar contraseña

    const isValidPass = await bcryptjs.compare(password, logUser.password)
    if (!isValidPass) { 
      res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
      return;
    }

    // creacion del token
    const payload = {
      id: logUser._id,
      name: logUser.name,
      email: logUser.email
    }

    const secretKey = process.env.JWT_SECRET
    if (!secretKey) { 
      res.status(400).json({
        success: false,
        message: "SecretKey variable is empty or missing"
      })
      return
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: "5m" })
    console.log(token)


    res.status(200).json({
      success: true,
      message: "User successfully logged in",
      data: {
        id: logUser._id,
        name: logUser.name,
        email: logUser.email,
      },
    })
    


    
  } catch (error: unknown) {
    next(error)
    
  }
 }

export { registerUser, loginUser}