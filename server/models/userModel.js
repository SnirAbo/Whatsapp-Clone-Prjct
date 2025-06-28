const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
   username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // שמור מוצפן
    displayName: { type: String, required: true }, // שם שמוצג באפליקציה
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'group' }]
  },
  { versionKey: false }
);

const User = mongoose.model('user', userSchema, 'users');

module.exports = User;
