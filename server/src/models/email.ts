import { Date, Schema, model, Document } from 'mongoose';

export interface EmailDocument extends Document {
  recipients: string[]
  subject: string
  author: string
  isRead: boolean
  content: string
  isStarred: boolean
  createdAt: Date
}

const EmailSchema = new Schema({
  recipients: {type: Array<String>, required: true},
  subject: {type: String, required: true},
  author: {type: String, required: true},
  isRead: Boolean,
  content: String,
  isStarred: Boolean,
}, {
  timestamps: {
    createdAt: true,
    updatedAt: false
  }
});

export const EmailModel = model<EmailDocument>('email', EmailSchema);