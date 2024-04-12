import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserDocument } from '../@types/User';
const saltRounds = 10

const UserProfileSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String }
}, { _id: false });

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'seller', 'user'], default: 'user' },
    profile: { type: UserProfileSchema, required: true },
})

UserSchema.pre('save', function (next) {
    let user = this
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) return next(err);

        user.password = hash
        next();
    }
    )

})

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error: any) {
        throw new Error(error);
    }
};


export default mongoose.model<UserDocument>('User', UserSchema);