import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  password: String,
  emailAddress: {
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

export const User = model('User', userSchema);