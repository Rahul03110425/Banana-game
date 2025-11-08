require('dotenv').config()

const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY 

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Get the token from the Authorization header

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Verify the token using the secret key (replace 'your-secret-key' with your actual secret)
        const decoded = jwt.verify(token, SECRET_KEY);

        console.log(decoded)
        // You can add user info to the request object to use in other parts of the application
        req.user = decoded;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};


module.exports = {authenticate}