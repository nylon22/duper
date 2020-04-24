const addClusterCmd = require('./add-cluster');
const deleteClusterCmd = require('./delete-cluster');
const listCmd = require('./list');
const setFollowerClusterCmd = require('./set-follower-cluster');
const setLeaderClusterCmd = require('./set-leader-cluster');

module.exports = {
  addClusterCmd,
  deleteClusterCmd,
  listCmd,
  setFollowerClusterCmd,
  setLeaderClusterCmd,
};
