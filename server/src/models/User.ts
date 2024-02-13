import { Schema, model, Document } from 'mongoose';

import { EMAIL_REGEX } from '@mail/common';

export interface UserDocument extends Document {
  password: string,
  email: string
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
    }
  }
});

export const UserModel = model<UserDocument>('user', UserSchema);