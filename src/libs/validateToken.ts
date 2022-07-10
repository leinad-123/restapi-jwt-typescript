import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

export const TokenValidation = (req:Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("auth-token");
        if (!token) return res.status(401).send("Access Denied");
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        req.userId = payload._id;
        next()
    }catch(e){
        console.log(e)
        if (e instanceof JsonWebTokenError){
            return res.status(401).send("Invalid token");
        }else {
            return res.status(401).send("Error in validation token")
        }
    }
}