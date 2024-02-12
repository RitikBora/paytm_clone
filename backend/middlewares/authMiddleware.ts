import { NextFunction, Request  , Response} from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "../config";

export interface AuthenticationRequest extends Request
{
    userId ?: string
}
const authMiddleware = (req :AuthenticationRequest , res: Response , next : NextFunction) =>
{
    const authorizationToken = req.headers.authorization;

    if(!authorizationToken )
    {
        return res.status(403).send({message : "Not authorized"});
    }
    try
    {
        const decoded = jwt.verify(authorizationToken , JWT_SECRET) as JwtPayload;
        if(!decoded)
        {
            return res.status(403).send({message : "Not authorized"});
        }
        req.userId = decoded.userId;
        next();
    }catch(err : any)
    {
        return res.status(403).send({message : "Not authorized"});
    }
    

   
}

export default authMiddleware;