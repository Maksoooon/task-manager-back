const uuid = require("uuid");
const Task = require("../models").Task;

function getTasks(req, res) {
    return Task.findAll({
        order: ["task_created_at"],
    })
        .then((data) => {
            res.status(200).send({ data });
        })
        .catch((error) => {
            res.status(400).send(error);
        });
}

function createTask(req, res) {
    const a = uuid.v1();
    console.log(a);
    return Task.create({
        task_uuid: uuid.v1(),
        task_title: req.body.task_title,
        task_description: req.body.task_description,
    })
        .then((task) => res.status(201).send({ data: task }))
        .catch((error) => res.status(500).send(error));
}

module.exports = {
    getTasks,
    createTask,
};
