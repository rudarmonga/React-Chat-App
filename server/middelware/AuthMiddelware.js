import { response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.JWT;
    if(!token) return res.status(401).send("You are not authenticated!");
    jwt.verify(token, process.env.JWT_KEY, async (err, payLoad) => {
        if(err) return response.status(403).send("Token is not valid!");
        req.userId = payLoad.userId;
        next();
    })
}