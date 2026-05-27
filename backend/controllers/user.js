const db = require('../config/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const data = await db.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        if (data.rows.length > 0) {
            return res.status(403).json({ message: "User already exists!" });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const id = crypto.randomUUID();

        firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

        await db.query(
            `INSERT INTO users(id, first_name, last_name, email, password)
             VALUES ($1, $2, $3, $4, $5)`,
            [id, firstName, lastName, email, hashedPass]
        );

        return res.status(201).json({ message: "Account created!" });

    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return res.status(500).json({ message: "SERVER ERROR" });
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
        console.error("LOGIN ERROR:", error);
        return res.status(500).json({ message: "SERVER ERROR" });
    }
    
}

const getCurrent = async (req, res) => {
    try {
        const data = await db.query(
            `SELECT id, first_name, last_name, email FROM users WHERE id = $1`, 
            [req.user.id]
        ); 

        if(data.rows.length < 1) {
            return res.status(404).json({message: "User not found!"});
        }
        const user = data.rows[0]

        return res.status(200).json(user);
    } catch (error) {
        console.error("GET_CURRENT ERROR:", error);
        return res.status(500).json({ message: "SERVER ERROR" });
    }
}

const getProjectCreator = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await db.query(
            `SELECT u.first_name, u.last_name, u.email FROM users u
            JOIN projects p ON p.userid = u.id
            WHERE p.id = $1`,
            [id]
        );

        if(data.rows.length < 1) {
            return res.status(404).json({message: "User not found!"});
        }

        const user = data.rows[0];

        return res.status(200).json(user);
    } catch (error) {
        console.log("GET_CREATOR ERROR:", error);
        return res.status(500).json({message: "SERVER ERROR"})
    }
}

module.exports = { register, login, getCurrent, getProjectCreator }