const mongoose = require("mongoose");

const subTaskModel = mongoose.Schema({
    task_id: {type: Number, required: true},
    content: { type: String },
    status: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = mongoose.model("SubTask", subTaskModel);
