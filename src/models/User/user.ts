import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../interfaces';

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        id_userType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user_types'
        },
        fullname: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('users', UserSchema);
