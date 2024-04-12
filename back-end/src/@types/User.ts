import { Document } from "mongoose";
export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'seller' | 'user';
    profile: {
        firstName: string;
        lastName: string;
    };
    comparePassword(candidatePassword: string): Promise<boolean>;
}