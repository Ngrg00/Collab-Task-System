const crypto = require('crypto');
const db = require('../config/db');

const createProject = async (req, res) => {
    try {
        const { name, due } = req.body;

        const id = crypto.randomUUID();

        await db.query(
            `INSERT INTO projects(id, userId, title, due_in)
             VALUES ($1, $2, $3, $4)`,
            [id, req.user.id, name, due ]
        );

        const role = "admin";

        await db.query(
            `INSERT INTO project_members(project_id, user_id, role)
             VALUES ($1, $2, $3)`,
            [id, req.user.id, role]
        );

        return res.status(200).json({message: "New project created!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error"});
    }
}

const getProjects = async(req, res) => {
    try {
        const data = await db.query(
            `SELECT * FROM projects`
        )

        if(data.rows.length < 1) {
            return res.status(400).json({message: "Projects does not exist!"})
        }

        return res.status(200).json(data.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" })
    }
}

const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        
        const data = await db.query(
            `SELECT * FROM projects WHERE id = $1`,
            [id]
        );

        if(data.rows.length < 1) {
            return res.status(404).json({message:"Project not found!"});
        }
        
        const project = data.rows[0];

        return res.status(200).json(project);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = { createProject, getProjects, getProject }