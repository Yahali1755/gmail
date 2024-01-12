import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  password: string,
  mail: string
} 

const UserSchema = new Schema({
  password: String,
  mail: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: 'Invalid email format',
    },
  }
});

export const UserModel = model<UserDocument>('user', UserSchema);