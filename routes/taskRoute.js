const express = require("express");
const router = express.Router();
const {taskModel, Status} = require("../models/taskModel");
const userModel = require("../models/userModel");
const subtaskModel = require("../models/subtaskModel");
const authMiddleware = require("../middlewares/authMiddleware");
const cronScheduler = require("../services/cronScheduler");

router.post("/add/task", authMiddleware, async (req,res) => {

    const {title, description, due_date} = req.body;
        const userId = req.body.userId;
        // const user = await userModel.find({ _id: userId });
        const newTask = new taskModel({title, description, userId, due_date})
        newTask.save()
            .then(() => {
                cronScheduler.createTaskScheduler()
                return (res.status(200).json({message: "Task added successfully"}))
            })
            .catch((error) => {
                return (
                    res.status(500).json({message: error.message})
                )
            })
});

router.get("/get/tasks", authMiddleware, async (req, res)=>{
    taskModel.find({userId: req.body.userId})
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(501).json({message: error.message}))
})


router.patch("/task", authMiddleware, async (req,res) =>{
    const {id, due_date, status} = req.body;

        let todoStatus;

        if(status == Status.DONE) todoStatus = Status.DONE
        else if(status == Status.IN_PROGRESS)   todoStatus = Status.IN_PROGRESS
        else todoStatus = Status.TODO

        const updateVal = {
            status: todoStatus,
            due_date: due_date,
        }

        taskModel.findByIdAndUpdate({_id: id}, updateVal)
            .then(() => res.status(200).json({message: "Task updated successfully"}))
            .catch((error) => res.status(501).json({message: error.message}))
})

router.patch("/task/priority", authMiddleware, async(req,res) => {

    const {id, priority} = req.body;

    taskModel.findByIdAndUpdate({_id: id}, {priority})
    .then(() => res.status(200).json({message: "Task updated successfully"}))
    .catch((error) => res.status(501).json({message: error.message}))

})

router.delete("/task", authMiddleware, async (req, res) => {

    const {id} = req.body;
    taskModel.findByIdAndDelete({_id: id})
        .then(() => res.status(200).json({message: "Task deleted successfully"}))
        .catch((error) => res.status(501).json({message: error.message}))

})

router.post("/add/sub/task", authMiddleware, async (req, res) => {

    const {task_id, content} = req.body;
    const newTask = new subtaskModel({task_id, content, status: false})
    newTask.save()
    .then(() => {
        return (res.status(200).json({message: "Sub Task added successfully"}))
    })
    .catch((error) => {
        return (
            res.status(500).json({message: error.message})
        )
    })
})


router.patch("/sub/task", authMiddleware, async (req, res) =>{

    const {status, id} = req.body;
    try {
        await subtaskModel.findByIdAndUpdate({_id: id}, {status: status});
        res.send("SubTask Updated Successfully")
    } catch (err) {
        res.status(500).json({error: err});
    }
})

router.get("/sub/task", authMiddleware, async (req, res) => {

    const {task_id} = req.body;

    subtaskModel.find({task_id: task_id})
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(501).json({message: error.message}))
})

router.delete("/sub/task", authMiddleware, async (req, res) => {

    const {id} = req.body;
    subtaskModel.findByIdAndDelete({_id: id})
        .then(() => res.status(200).json({message: "subtask deleted successfully"}))
        .catch((error) => res.status(501).json({message: error.message}))
})

module.exports = router;