import { Request, Response, NextFunction } from "express";
import Jwt from "../utils/jwt.js";

 export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    let { token } = req.headers;
    if (!token) {
      throw new Error("You are not sent token!");
    }
    const decodedToken = Jwt.Verify(token).user_id;
    if (!decodedToken) {
      throw new Error(`Invalid Your Token!. Expected ${decodedToken}`);
    } else {
      return next();
    }
  } catch (error : unknown) {
    return res.status(401).json({
        error :  "Invalid token!"
    })
  }
};
