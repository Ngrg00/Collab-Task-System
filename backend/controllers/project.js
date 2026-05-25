const crypto = require('crypto');
const db = require('../config/db');

const createProject = async (req, res) => {
    try {
        const { title, date, time } = req.body;

        const id = crypto.randomUUID();

        await db.query(
            `INSERT INTO projects(id, title, date, time)
             VALUE ($1, $2, $3, $4)`,
            [id, title, date, time]
        );

        return res.status(200).json({message: "New project created!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:"Failed to create new project!" });
    }
}

const getProject = async (req, res) => {
    try {
        const { id } = req.body;

        const data = await db.query(
            `SELECT * FROM projects WHERE id = $1`,
            [id]
        );

        if(data.rows.lenght < 1) {
            return res.status(404).json({message:"Project not found!"});
        }
        
        const project = data.rows[0];

        return res.status(200).json(project);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = { createProject, getProject }