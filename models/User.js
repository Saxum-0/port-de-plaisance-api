const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;
