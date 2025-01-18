const Task = require("./../models").task;
const { v4: uuidv4 } = require("uuid");

async function createTask(req, res) {
    try {
        const task = await Task.create({
            uuid: uuidv4(),
            ...req.body,
            author_uuid: req.userId,
        });

        res.status(201).json({ text: "Task created", data: task });
    } catch (error) {
        res.status(500).json({ text: "Error on create task", error });
    }
}

async function getTasks(req, res) {
    try {
        const tasks = await Task.findAll({
            where: {
                project_uuid: req.params.uuid,
            },
            raw: true,
        });

        res.status(200).json({ text: "Tasks to project", data: tasks });
    } catch (error) {
        res.status(500).json({ text: "Error on get tasks", error });
    }
}

async function getTask(req, res) {
    const task = await Task.findOne({
        where: {
            uuid: req.params.uuid
        }
    })

    res.status(200).json({ text: "Get task", data: task });
}

async function updateTask(req, res) {
    try {
        const task = await Task.update(
            {
                ...req.body,
            },
            {
                where: {
                    uuid: req.params.uuid,
                },
                returning: true,
                plain: true,
            }
        );
    
        res.status(200).json({text: "Task updated", data: task[1]})
    } catch (error) {
        res.status(500).json({text: "Error on update", error})
    }
    
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
};
