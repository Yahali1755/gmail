import { Schema, model } from 'mongoose';

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

export const MailModel = model('Mail', MailSchema);