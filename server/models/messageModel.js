const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    content: String,
    timestamp: { type: Date, default: Date.now },
    isGroupMessage: Boolean,
  },
  { versionKey: false }
);

const Message = mongoose.model('message', messageSchema);

module.exports = Message;
