const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    receiverUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    receiverGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'group' },
    content: String,
    timestamp: { type: Date, default: Date.now },
    isGroupMessage: Boolean,
  },
  { versionKey: false }
);

const Message = mongoose.model('message', messageSchema, 'messages');

module.exports = Message;
