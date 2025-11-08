const { connectToDatabase } = require("./database"); 
const bcrypt = require("bcryptjs"); 
const validator = require('validator');

async function addUser(userData) {
    const { email, username, password, level } = userData;

    // Check if the required fields exist
    if (!email ) {
        throw new Error("email can't be empty");
    }
    if (!username ) {
        throw new Error("username can't be empty");
    }
    if (!password) {
        throw new Error("password can't be empty");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Invalid email format.");
    }

    console.log(email)
    console.log(password)
    console.log(username)
    const db = await connectToDatabase();
    const collection = db.collection("user");

    const existingUser = await collection.findOne({
        $or: [{ email }, { username }],
    });

    if (existingUser) {
        throw new Error("User with the same email or username already exists.");
    }

    const password_hash = await bcrypt.hash(password, 10);

    const result = await collection.insertOne({
        email,
        username,
        password_hash,
        level: level || 0,
    });

    
    const insertedUser = await collection.findOne({ _id: result.insertedId });

    return insertedUser;  
}

async function getUser(userIdentifier) {
    const db = await connectToDatabase();
    const collection = db.collection("user");

    const user = await collection.findOne({
        $or: [{_id: userIdentifier}, { email: userIdentifier }, { username: userIdentifier }],
    });

    return user;
}

async function updateUser(userId, updatedData) {
    const db = await connectToDatabase();
    const collection = db.collection("user");

    const result = await collection.updateOne(
        { _id: userId },
        { $set: updatedData }
    );
    console.log('Update Result:', result); // Log the result to check if the update was successful
    return result;
}

async function updateLevel(userId, email) {
    const user = await getUser(email)
    console.log(user)
    console.log("user level", user.level)
    const newlevel = user.level + 1
    return await updateUser(user._id, { level: newlevel });
}

async function deleteUser(userId) {
    const db = await connectToDatabase();
    const collection = db.collection("user");
    const result = await collection.deleteOne({ _id: userId });
    return result;
}

async function comparePassword(plaintextPassword, hash) {
    const match = await bcrypt.compare(plaintextPassword, hash);
    return match;
}

module.exports = {
    addUser,
    deleteUser,
    getUser,
    updateUser,
    updateLevel,
    comparePassword,
};
