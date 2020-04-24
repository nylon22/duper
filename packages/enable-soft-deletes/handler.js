const axios = require('axios');
const sysPath = require('path');
const set = require('lodash.set');
const { getLeaderCluster, logESSuccess, logESFailure } = require('@duper/utils');

const handler = async ({ leader_index, verbose }) => {
  const { url: leaderUrl } = await getLeaderCluster();

  try {
    // Get the definition of the leader index
    const requestUrl = sysPath.join(leaderUrl, leader_index);

    const { data } = await axios({
      method: 'GET',
      url: requestUrl,
    });

    // We cannot just use leader_index, that may have been an alias
    const indexKey = Object.keys(data)[0];

    // Enable soft deletes for the index
    set(data, `${indexKey}.settings.index.soft_deletes`, { enabled: true });

    // Save the updated index definition
    const resp = await axios({
      method: 'PUT',
      requestUrl,
      data,
    });

    logESSuccess({
      message: `Successfully enabled soft deletes for leader index "${leader_index}" on your leader cluster`,
      response: resp.data,
      verbose,
    });
  } catch (error) {
    logESFailure({ error, verbose });
  }
};

module.exports = { handler };
