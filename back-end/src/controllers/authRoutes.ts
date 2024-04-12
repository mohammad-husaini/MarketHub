import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export async function registerUser(req: express.Request, res: express.Response): Promise<void> {
    try {

        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ username: username });

        if (existingUser) {
            res.status(400).send({ message: 'User already exists' });
            return

        }

        const user = new User({
            username: username, email: email, password: password, role: 'user', profile: { firstName: "Mohammad", lastName: "Husaini" }
        })
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1m' });


        res.status(201).send({ token, message: 'successfully register' });
    } catch (error) {

        res.status(500).send({ message: error });
    }

}

export async function loginUser(req: express.Request, res: express.Response): Promise<void> {
    try {

        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            res.status(404).send({ message: 'Please register first' });
            return

        }


        const isMatch = await existingUser.comparePassword(password);

        if (!isMatch) {
            res.status(401).send({ message: 'Invalid password' });
            return
        }

        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET!, { expiresIn: '2m' });

        res.cookie('jwtToken', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(201).send({ token, message: 'successfully login' });
    } catch (error) {

        res.status(500).send({ message: error });
    }


}

export function logoutUser(req: express.Request, res: express.Response): void {
    try {
        const cookie = req.cookies.jwtToken;

        if (!cookie) {
            res.status(401).send({ message: 'You are not logged in' });
            return
        }

        res.clearCookie('jwtToken').status(200).send({ message: 'Successfully logged out' });

    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
}
