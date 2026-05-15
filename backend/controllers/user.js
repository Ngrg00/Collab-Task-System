const db = require('../config/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const register = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName || !email || !password) {
       return res.status(400).json({message: "All fields are required!"});
    }

    const [data] = await db.query(
        `
        SELECT * FROM users
        WHERE email = ?
        `, [email]
    );

    if(data.length > 0) {
        return res.status(403).json({message: "User already exist!"});
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const id = crypto.randomUUID();

    await db.query(
        `
        INSERT INTO users(id, firstName, lastName, email, password)
        VALUES (?, ?, ?, ?, ?)
        `, [id, firstName, lastName, email, hashedPass]
    );

    res.status(201).json({message: "Account created!"});
}

const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({message: "All fields are required!"});
    }

    const [data] = await db.query(
        `
        SELECT * FROM users
        WHERE email = ?
        `, [email]
    );

    const user = data[0];

    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }, process.env.ACCESS_TOKEN, {});

        res.status(200).json({
            accessToken, 
            id: user.id, 
        });

    } else {
        return res.status(401).json({message: "Invalid credentials"});
    }
}

module.exports = { register, login }