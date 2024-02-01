const express = require("express");
const app = express();
var cors = require('cors')
require('dotenv').config()
app.use(express.json());

const db = require('./database/db');
app.use(cors())

const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/taskRoute');
app.use('/api/', userRoute)
app.use('/api/', taskRoute)


const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening on port ${port}!`));