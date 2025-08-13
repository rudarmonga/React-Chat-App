import jwt from "jsonwebtoken";
import Users from "../models/UserModels.js";
import { compare } from "bcrypt";

const maxAge = 3* 24* 60* 60* 1000;

const createToken = (email, userId) => {
    return jwt.sign({email, userId}, process.env.JWT_KEY, {expiresIn: maxAge});
}

export const signup = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).send("Email and password is Required");
        }
        const user = await Users.create({email, password});
        res.cookie("JWT", createToken(email,user.id), {
            maxAge,
            secure: true,
            sameSite: "None",
        });
        res.status(201).json({
            user
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).send("Email and password is Required");
        }
        const user = await Users.findOne({ email });
        if(!user) {
            return res.status(404).send("User not found");
        }
        const isMatch = await compare(password, user.password);
        if(!isMatch) {
            return res.status(401).send("Invalid Password");
        }
        res.cookie("JWT", createToken(email,user.id), {
            maxAge,
            secure: true,
            sameSite: "None",
        });
        res.status(200).json({
            user
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}