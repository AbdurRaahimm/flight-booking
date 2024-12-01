import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        // check if user already exists 
        const userExist = await User.findOne({ email });
        if (userExist) {
            throw new Error("User already exists");
        }

        // password length check 8 characters more or equal 
        if (password.length < 8) {
            throw new Error("Password must be 8 characters or more");
        }

        // hash the password 
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check if user already exists 
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            // generate token
            const token = jwt.sign({
                id: user._id, username: user.username, email: user.email, role: user.role
            },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            // store token in cookie
            res.cookie("token", token, {
                maxAge: 60 * 60 * 1000,  // 1h
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });
            const { _id, username, email, role } = user;
            return res.status(200).json({
                token,
                message: "Login successfully",
                user: { _id, username, email, role }
            });
        } else {
            return res.status(401).json({ message: "Authentication Failed" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message || "Something went wrong" });
    }
}

const userUpdate = async (req, res) => {
    try {
        const userId = req.userid; // Assuming user ID is attached to `req.user` by an authentication middleware
        const { username, email } = req.body;

        // Fetch the current user from the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields if provided
        if (username) user.username = username;

        if (email) {
            // Check if the new email is already taken
            const emailExist = await User.findOne({ email });
            if (emailExist && emailExist.id !== userId) {
                throw new Error("Email already in use by another account");
            }
            user.email = email;
        }

        // Save the updated user to the database
        const updatedUser = await user.save();

        // Respond with the updated user information
        const { _id, username: updatedUsername, email: updatedEmail, role } = updatedUser;
        return res.status(200).json({
            message: "User updated successfully",
            user: { _id, username: updatedUsername, email: updatedEmail, role }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Something went wrong" });
    }
};


export { register, login, userUpdate };