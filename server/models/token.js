const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    isUsed: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;