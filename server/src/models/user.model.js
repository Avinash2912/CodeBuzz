const mongoose = require('mongoose')
// const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { JWT_SECRET, JWT_EXPIRY } = require('../config/server.config')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        uniqueCaseInsensitive: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: {
            unique: true,
        },
    },
    password: {
        type: String,
        required: true,
        minLength: [3, 'Password cannot be less than 3 characters'],
    },
    username: {
        type: String,
        lowercase: true,
        uniqueCaseInsensitive: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: {
            unique: true,
        },
    },
    name: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default:
            'https://res.cloudinary.com/dj7k0lade/image/upload/v1623778856/default-profile-picture-1-300x300-1_zqjx9o.jpg',
    },
    bio: {
        type: String,
        default: '',
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

//triggered before save
userSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
        const user = this
        const SALT = bcrypt.genSaltSync(9)
        const encryptedPassword = bcrypt.hashSync(user.password, SALT)
        user.password = encryptedPassword
        next()
    } else {
        return next()
    }
})

userSchema.methods.comparePassword = function compare(password) {
    return bcrypt.compareSync(password, this.password)
}

userSchema.methods.generateJWT = function generate() {
    return jwt.sign({ id: this._id, email: this.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY,
    })
}

const User = mongoose.model('User', userSchema)

module.exports = User
