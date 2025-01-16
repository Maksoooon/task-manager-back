const taskRouter = require('./task');
const authRouter = require('./auth');
const projectRouter = require('./project');
const sprintRouter = require('./sprint');

module.exports = {
  taskRouter,
  authRouter,
  projectRouter,
  sprintRouter
}
