const db = require('../config/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });

        const data = await db.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        if (data.rows.length > 0) {
            return res.status(403).json({ message: "User already exists!" });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const id = crypto.randomUUID();

        await db.query(
            `INSERT INTO users(id, first_name, last_name, email, password)
             VALUES ($1, $2, $3, $4, $5)`,
            [id, firstName, lastName, email, hashedPass]
        );

        return res.status(201).json({ message: "Account created!" });

    } catch (err) {
        console.error("REGISTER ERROR:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message: "All fields are required!"});
        }

        const data = await db.query(
            `SELECT * FROM users WHERE email = $1`, 
            [email]
        );

        const user = data.rows[0];

        if(user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                id: user.id,
            }, process.env.ACCESS_TOKEN, {});

            return res.status(200).json({accessToken, id: user.id, });

        } else {
            return res.status(401).json({message: "Invalid credentials"});
        }
    } catch (error) {
        console.error("LOGIN ERROR:", err);
        return res.status(500).json({ message: "Server error" });
    }
    
}

const getCurrent = async (req, res) => {
    const data = await db.query(
        `SELECT id, first_name, last_name, email FROM users WHERE id = $1`, 
        [req.user.id]
    ); 

    const user = data.rows[0]

    return res.status(200).json(user);
}

module.exports = { register, login, getCurrent }