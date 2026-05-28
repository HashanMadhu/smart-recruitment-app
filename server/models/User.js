// server/models/User.js
// [Language: JavaScript / Node.js]

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // This is for encrypting passwords (import bcryptjs package for that)

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false // Security හේතූන් මත API එකකින් දත්ත ගනිද්දී password එක ඉබේම ලැබීම වළක්වයි
    },
    role: {
        type: String,
        enum: ['candidate', 'recruiter', 'admin'],
        default: 'candidate' // Register වන කෙනෙක් default සාමාන්‍ය අයදුම්කරුවෙක් වේ
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


UserSchema.pre('save',async function(next){ 
    // If the password is not modified, skip hashin
    if(!this.isModified('password')){
        return next(); 
    }
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});


module.exports = mongoose.model('User', UserSchema);