import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a User Name"],
    },
    email : {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        miminlength: 8,
    },
    role: {
        type: String,
        enum:['user', 'admin'],
        default: 'user',
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;