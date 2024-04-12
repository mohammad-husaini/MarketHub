import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { DecodedToken, authRequest } from '../@types/auth.js';

export async function authenticateUser(req: authRequest, res: Response, next: NextFunction): Promise<void> {
    try {

        const token = req.cookies['jwtToken'];

        if (!token) {
            res.status(401).send({ message: 'Authorization token not provided' });
            return
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken
        if (!decodedToken) {
            res.status(401).json({ message: 'Invalid authorization token' });
            return
        }
        const user = User.findById(decodedToken.userId)
        if (!user) {

            res.status(404).send({ message: 'User not found' });
            return
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}