const crypto = require('crypto');
const db = require('../config/db');

const addTask = async (req, res) => {
    try {
        const { subProjectId, title, priority, due } = req.body;

        if( !subProjectId || !title || !priority || !due) {
            return res.status(400).json({message: "All fields are required!"});
        }

        const id = crypto.randomUUID();

        await db.query(
            `INSERT INTO tasks(id, sub_project_id, user_id, title, priority, due_in)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [id, subProjectId, req.user.id, title, priority, due]
        );

        return res.status(200).json({message: "New task created!"});
    } catch (error) {
        console.log("ADD TASK ERROR:", error);
        return res.status(500).json({message: "Server error!"});
    }
}

const getTasks = async (req, res) => {
    try {
        const { id } = req.params;

        if(!id) {
            return res.status(400).json({message: "Requires sub-project id to get task!"});
        }

        const data = await db.query(
            `SELECT * FROM tasks WHERE sub_project_id = $1`,
            [id]
        ); 

        if(data.rows.length < 1) {
            return res.status(400).json({message: "Task not found!"});
        }

        return res.status(200).json(data.rows);
    } catch (error) {
        console.log("GET TASK ERRRO:",error);
        return res.status(500).json({message: "Server error!"});
    }
}
module.exports = { addTask, getTasks }