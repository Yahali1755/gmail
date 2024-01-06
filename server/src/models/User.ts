import { Schema, model } from 'mongoose';

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

export const UserModel = model('User', UserSchema);