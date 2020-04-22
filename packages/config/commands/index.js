const addClusterCmd = require('./add-cluster');
const deleteClusterCmd = require('./delete-cluster');
const listCmd = require('./list');
const setCurrentClusterCmd = require('./set-current-cluster');

module.exports = {
  addClusterCmd,
  deleteClusterCmd,
  listCmd,
  setCurrentClusterCmd,
};
