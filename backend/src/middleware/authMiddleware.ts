import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";


const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const header = req.headers.authorization
  if (!header) { 
    res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
    return
  }

  try {
    const token = header.split(" ")[1]
    if (!token) { 
      res.status(401).json({
        success: false,
        message: "Token is required"
    });
    return
    }

    const secretKey = process.env.JWT_SECRET
    if (!secretKey) { 
      res.status(401).json({
        success: false,
        message: "Credentials empty or missing"
      });
      return
    }
    
    const valideToken = jwt.verify(token, secretKey)
    if (!valideToken) {
      res.status(401).json({
        success: false,
        message: "Invalide token"
      });
      return
    }
    next()
    
  } catch (error:unknown) {

    next(error)
    
  }
 }


export { authMiddleware }