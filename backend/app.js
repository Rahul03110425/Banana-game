// Import the express module
require('dotenv').config()

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const {
    addUser,
    deleteUser,
    getUser,
    updateUser,
    comparePassword,
    updateLevel,
} = require("./userModel");
const { authenticate } = require("./middleware");

const app = express();

const SECRET_KEY = process.env.SECRET_KEY 

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.post("/signup", async (req, res) => {
    try {
        const userData = req.body;
        if (!userData) {
            throw new Error("email, username, password cant be empty");
        }
        const user = await addUser(userData);
        const token = jwt.sign(
            { id: user._id, email: user.email },
            SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.status(200).json({ token, email: user.email, username: user.username, level: user.level });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await getUser(email);
        if (!user) {
            return res.status(404).json({ message: "email not found" });
        }

        // Compare the input password with the stored hash
        const isMatch = await comparePassword(password, user.password_hash);
        if (isMatch) {
            // Generate a JWT token
            const token = jwt.sign(
                { id: user._id, email: user.email },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            res.status(200).json({ token, email: user.email, username: user.username, level: user.level });
        } else {
            res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
});

app.post("/user/level", authenticate, async (req, res) => {
    try {
        const userId = req.user.id;
        const email = req.user.email;

        await updateLevel(userId, email)
        res.json({message: "updated successfully"});
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Failed to fetch data");
    }
});

app.get("/quiz", authenticate, async (req, res) => {
    try {
        const response = await axios.get(
            "https://marcconrad.com/uob/banana/api.php?out=json"
        );

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Failed to fetch data");
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
