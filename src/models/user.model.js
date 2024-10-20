import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    avatar: {
        type: String,
        required: true,
    },

    coverImage: {
        type: String,
    },
    
    watchHistory: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
    },

    refreshToken: {
        type: String,
    },
}, 
{
    timestamps: true
})


userSchema.pre('save', async function(next) {
        if(Schema.isModified('password')) return (next);
        this.password = bcrypt.hash(this.password, 10);
        next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    jwt.sign({
        _id: this._id,
        email: this.email,
        fullName: this.fullName,
        userName: this.userName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)}

userSchema.methods.generateRefreshToken = function () {
    jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
export const User = mongoose.model('User', userSchema)