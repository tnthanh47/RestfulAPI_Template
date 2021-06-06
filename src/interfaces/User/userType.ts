import { Document } from 'mongoose';

export default interface IUserType extends Document {
    name: string;
}
