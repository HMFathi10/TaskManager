// console.log('Task Manager App')

const express = require("express");
const app = express();
const tasksRoutes = require("./routes/tasks");
const port = 3000;
const database = require('./db/connect');
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler")

//Middleware
app.use(express.static('./public'));
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasksRoutes);
app.use(errorHandlerMiddleware);
app.use(notFound);

const start = async () => {
    try {
        await database(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}`));
    } catch (err) {
        console.log(err);
    }
}

start();

