import { Request, Response, NextFunction } from 'express';
import User from "../models/userModel";
const { verifyPassword, generateToken, hashPassword } = require("../");

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: true, message: 'Please provide email and password!' });
        }

        let user: any = await User.findOne({
            email
        })

        const isValid = await verifyPassword(password, user.password)
        if (!isValid) return res.status(401).json({ error: true, message: 'Invalid credentials' });

        const token = generateToken({ id: user.id, email: user.email })
        if (user) {
            res.status(200).json({
                error: false,
                data: token,
                message: 'User fetched successfully!'
            });
        } else {
            res.status(200).json({
                error: true,
                message: 'Error Fetching User Details!'
            });
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json(error);
    }
}

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, mobile, firstName, lastName } = req.body;
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ error: true, message: 'Please provide all required fields!' });
        }
        const hashedPassword = await hashPassword(password);
        await User.create({ ...req.body, password: hashedPassword });
        res.status(200).json({
            error: false,
            message: 'User Created successfully!'
        });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json(error);
    }
}

export const profile = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user.user_id).select('-password');
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found!' });
        }
        res.status(200).json({
            error: false,
            data: user,
            message: 'User fetched successfully!'
        });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json(error);
    }
}
