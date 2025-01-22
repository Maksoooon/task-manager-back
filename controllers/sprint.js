const Sprint = require("./../models").sprint;
const { v4: uuidv4 } = require("uuid");

async function createSprint(req, res) {
    try {
        const sprint = await Sprint.create({
            uuid: uuidv4(),
            ...req.body,
            author_id: req.userId,
        });
    
        res.status(201).json({ text: "Sprint created", data: sprint });
    } catch (error) {
        res.status(500).json({ text: "Sprint error", error });
    }
}
async function getSprints(req, res) {
    try {
        const sprints = await Sprint.findAll({
            where: {
                project_id: req.params.uuid,
            },
        });
    
        res.status(200).json({ text: "Get sprints to project", data: sprints });
    } catch (error) {
        res.status(500).json({ text: "Error", error });
    }
    
}

async function getSprint(req, res) {
    try {
        const sprint = await Sprint.findOne({
            where: {
                uuid: req.params.uuid,
            },
        });
    
        res.status(200).json({ text: "Get sprint", data: sprint });
    } catch (error) {
        res.status(500).json({ text: "Error", error });
    }
    
}

async function updateSprint(req, res) {
    try {
        const sprint = await Sprint.update(
            {
                ...req.body,
            },
            {
                returning: true,
                plain: true,
                where: {
                    uuid: req.params.uuid
                },
            }
        );
    
        res.status(200).json({ text: "Updated", data: sprint[1] });
    } catch (error) {
        res.status(500).json({ text: "Error", error });
    }
    
}

module.exports = {
    createSprint,
    getSprints,
    getSprint,
    updateSprint,
};
