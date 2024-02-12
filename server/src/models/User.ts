import { Schema, model, Document } from 'mongoose';

import { EMAIL_REGEX } from '@mail/common';

export interface UserDocument extends Document {
  password: string,
  email: string
  theme: {
    isDarkTheme: boolean
  }
} 

const UserSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => EMAIL_REGEX.test(value),
      message: 'Invalid email format',
    },
  },
  theme: {
    isDarkTheme: {
      type: Boolean,
      default: false
    }
  }
});

export const UserModel = model<UserDocument>('user', UserSchema);