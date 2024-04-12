import { Request, Response, NextFunction } from 'express';

export function checkLoggedIn(req: Request, res: Response, next: NextFunction) {

    const cookie = req.cookies.jwtToken

    if (cookie) {
        res.status(200).send({ message: 'You are already logged in' });
    }
    else {
        next()
    }

}