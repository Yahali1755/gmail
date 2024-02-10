import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  password: string,
  email: string
} 

const UserSchema = new Schema({
  password: String,
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: 'Invalid email format',
    },
  }
});

export const UserModel = model<UserDocument>('user', UserSchema);