import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    try {
        // saving a new user
        const user: IUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        user.password = await user.encryptPassword(user.password);
        const savedUser = await user.save();

        // token 
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET as string, {
            expiresIn: 8 * 60 * 60
        })
        res.header({ "auth-token": token }).status(201).json(savedUser);
    } catch (e) {
        console.error(e);
        res.status(500).send("server error")
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(400).send("Email or password incorrect");

        const correctPassword = await user.validatePassword(req.body.password);

        if (!correctPassword) return res.status(400).send("Invalid password");

        // token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: 8 * 60 * 60
        })

        res.header({ "auth-token": token }).json(user);
    } catch (e) {
        console.error(e);
        res.status(500).send("server error")
    }
}

export const profile = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.userId, {
            password: 0,
            __v: 0
        });
        if(!user) res.status(404).json("No User found");
        res.json(user);
    } catch (e) {
        console.error(e);
        res.status(500).send("server error")
    }
}