import mongoose, { Schema } from 'mongoose';
import { IUserType } from '../../interfaces';

const UserTypeSchema: Schema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUserType>('user_types', UserTypeSchema);
