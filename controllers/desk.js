const uuid = require("uuid");
const Desk = require("../models").desks;

function getDesks(req, res) {
    return Desk.findAll()
        .then((data) => {
            res.status(200).send({ data });
        })
        .catch((error) => {
            res.status(400).send(error);
        });
}

function createDesk(req, res) {
    return Desk.create({
        desk_uuid: uuid.v1(),
        desk_title: req.body.desk_title
    })
        .then((desk) => res.status(201).send({ data: desk }))
        .catch((error) => res.status(400).send({error}));
}

module.exports = {
    getDesks,
    createDesk,
};
