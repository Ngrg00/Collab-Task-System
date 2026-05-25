require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorhandler.js');
const db = require('./config/db.js');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/', require('./router/user.js'));
app.use(errorHandler);

app.listen(process.env.PORT, async () => {
    console.log("Server is running on", process.env.PORT); 
    
    try {
        await db.query('SELECT 1');
        console.log("DB connected!");
    } catch (error) {
        console.error("DB unable to connect:", error.message);
    }
});