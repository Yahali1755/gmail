import { Date, Schema, model, Document } from 'mongoose';

export interface MailDocument extends Document {
  recipients: string[]
  subject: string
  author: string
  isRead: boolean
  content: string
  isStarred: boolean
  createdAt: Date
}

const MailSchema = new Schema({
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

export const MailModel = model<MailDocument>('mail', MailSchema);