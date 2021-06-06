import mongoose, { Document } from 'mongoose';

export default interface IUser extends Document {
    // pk id user, fk id user type
    username: string;
    password: string;
    id_userType: mongoose.Schema.Types.ObjectId;
    fullname: string;
    email: string;
    phone: string;
    address: string;
}
