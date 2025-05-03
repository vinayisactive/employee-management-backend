import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'; 

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
      };
    }
  }
}

const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token; 

        if(!token){
          res.status(401).json({
            message: "Token is missing."
          }); 

          return; 
        }
                
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { 
            id: string; 
            username: string; 
            iat: number; 
            exp: number 
          };

          req.user = {
            id: decoded.id,
            username: decoded.username
          };
          
          next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                message: "Session expired, please login again"
            });

            return; 
        }

        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({
                message: "Invalid authentication token"
            });

            return; 
        }

        res.status(500).json({
            message: "Authentication failed"
        });
    }
}; 

export default authMiddleware