const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  },
  { versionKey: false }
);

const Group = mongoose.model('group', groupSchema);

module.exports = Group;
