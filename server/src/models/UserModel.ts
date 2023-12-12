import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  emailAdress: {
    type: String,
    required: false,
    unique: true,
    validate: {
      validator: (value) => {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: 'Invalid email format',
    },
  },
});

export const User = model('User', userSchema);