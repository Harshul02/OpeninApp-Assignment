const mongoose = require("mongoose");


const Status = Object.freeze({
    TODO: "todo",
    IN_PROGRESS: "process",
    DONE: "done"
})

const taskModel = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    status: { type: String, default: Status.TODO.toString() },
    due_date: {type: Date},
    priority: {type: Number, default: 0}
}, { timestamps: true });


const Task = mongoose.model("Task", taskModel);

module.exports = {
    taskModel: Task,
    Status: Status
};