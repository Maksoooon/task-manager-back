const User = require("../models").user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
require('dotenv').config()

async function registration(req, res) {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        User.create({
            uuid: uuidv4(),
            email,
            password: hashedPassword,
        });

        res.status(201).json({ text: "User created" });
    } catch (error) {
        res.status(500).json({ text: "Registration failed", error });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        console.log()
        const token = jwt.sign({ userId: user.uuid }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_ALIVE,
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
}

module.exports = {
    registration,
    login,
};
