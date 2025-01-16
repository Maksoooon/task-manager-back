const Sprint = require("./../models").sprint;
const { v4: uuidv4 } = require("uuid");

async function createSprint(req, res) {
    const sprint = await Sprint.create({
        uuid: uuidv4(),
        ...req.body,
        author_id: req.userId
    })

    res.status(201).json({text: "Sprint created", data: sprint})
}
async function getSprints(req, res) {}
async function updateSprint(req, res) {}

module.exports = {
    createSprint,
    getSprints,
    updateSprint
}