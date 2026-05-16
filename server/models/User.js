import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;