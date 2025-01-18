const Project = require("./../models").project;
const { v4: uuidv4 } = require("uuid");

async function createProject(req, res) {
    const { name, description } = req.body;
    const project = await Project.create({
        uuid: uuidv4(),
        name,
        description,
        owner: req.userId,
    });

    res.status(201).json({ text: "Project created", data: project });
}

async function getProjects(req, res) {
    const projects = await Project.findAll({
        where: {
            owner: req.userId,
        },
    });

    res.status(200).json({ text: "Get projects", data: projects });
}

async function getProject(req, res) {
    const project = await Project.findOne({
        where: {
            uuid: req.params.uuid
        }
    })

    res.status(200).json({ text: "Get project", data: project });
}

async function updateProject(req, res) {
    try {
        const project = await Project.update(
            {
                ...req.body,
            },
            {
                returning: true,
                plain: true,
                where: {
                    uuid: req.params.uuid,
                    owner: req.userId,
                },
            }
        );

        res.status(200).json({ text: "Updated", data: project[1] });
    } catch (error) {
        res.status(500).json({
            text: "Error",
            message: "Project doesn't exists",
        });
    }
}

async function deleteProject(req, res) {
    try {
        await Project.destroy({
            where: {
                uuid: req.params.uuid,
                owner: req.userId,
            },
        });

        res.status(200).json({ text: "Deleted" });
    } catch (error) {
        res.status(500).json({ text: "Error", error });
    }
}

module.exports = {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
};
