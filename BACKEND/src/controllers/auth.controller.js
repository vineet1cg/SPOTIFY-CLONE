const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerUser(req, res) {
    const { username, email, password, role = "user" } = req.body

    //mongoDB checking for user existing
    const userAlreadyExists = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    });
    //check if user exists and is trying to create a new account with the same credentials 
    if (userAlreadyExists) {
        return res.status(409).json({
            message: "User Already Exists"
        })
    };
    //hash password before creating user details in the database
    const hash = await bcrypt.hash(password, 10);
    //create new user
    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    });

    //jwt token , toffe giving :D
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true, sameSite: 'lax' });

    //user created now :DD send back response
    res.status(201).json({
        message: "USER CREATED SUCCESSFULLY 👌",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        }
    });

}
async function loginUser(req, res) {
    // user will either enter (username+password) or (emai+password) when loggin in :P
    // meaning one will have a value and the other will be undefined :D
    const { username, email, password } = req.body;

    //checking if user exists
    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });
    // if not then redirected with below message
    if (!user) {
        return res.status(401).json({ message: "Account Bana Pehle " });
    }
    //password verification if user exists in the db
    const isPasswordValid = await bcrypt.compare(password, user.password);

    //if password not valid  ( U_U / ~_~ ) 
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Password Galat He =( " });
    }

    //password is correct too , genuine user 🤧
    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET);

    // give user cookie as token of appriciation 😂
    res.cookie("token", token, { httpOnly: true, sameSite: 'lax' });

    //finally say goodbye 🗿
    res.status(200).json({
        message: "User Login Successfully (took so long lol)",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        }
    });

    // all steps complete thanks for watchingk 🙏
}

async function getMe(req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        });
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

async function logoutUser(req, res) {
    res.clearCookie("token");
    return res.status(200).json({
        message: "user logged out successfully"
    });
}
module.exports = { registerUser, loginUser, logoutUser, getMe };