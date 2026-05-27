const crypto = require('crypto');
const db = require('../config/db');

const addSubProject = async (req, res) => {
    try {
        const { projectId, title } = req.body;

        if(!projectId, !title) {
            return res.status(400).json({message: "All fields are required!"});
        }
        
        const data = await db.query(
            `SELECT * FROM sub_projects WHERE title = $1 AND project_id = $2`,
            [title, projectId]            
        );
        if(data.rows.length > 0) {
            return res.status(400).json({message: "Sub-Project already exist!"});
        }

        const id = crypto.randomUUID();

        await db.query(
            `INSERT INTO sub_projects(id, project_id, title)
             VALUES ($1, $2, $3)`,
            [id, projectId, title]
        );

        return res.status(200).json({message: "New sub-project created!"})
    } catch (error) {
        console.log("ADD SUB-PROJECT ERROR:", error);
        return res.status(500).json({message: "Server error!"});
    }
}

const getSubProjects = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await db.query(
            `SELECT * FROM sub_projects WHERE project_id = $1`,
            [id]
        );

        return res.status(200).json(data.rows);
    } catch (error) {
        console.log("GET SUB-PROJECT ERROR", error);
        return res.status(500).json({message: "SERVER ERROR!"});
    }
}

module.exports = { getSubProjects, addSubProject }