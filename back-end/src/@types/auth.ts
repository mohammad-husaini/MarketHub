import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface DecodedToken extends JwtPayload {
    userId: string;
}
export interface authRequest extends Request {
    user?: any;
}
