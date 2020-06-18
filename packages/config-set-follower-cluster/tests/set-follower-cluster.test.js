const { handler } = require('../handler');
const {
  getConfigurationFile,
  writeConfigurationFile,
  logSuccess,
  logFailure,
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

describe('set-follower-cluster', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs failure when cluster does not exist', async () => {
    getConfigurationFile.mockResolvedValue({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }] });

    await handler({ name: 'japan-cluster' });

    expect(logFailure).toHaveBeenCalledTimes(1);
    expect(logFailure.mock.calls[0][0].error).toBe('Cluster named "japan-cluster" does not exist');
    expect(logFailure.mock.calls[0][0].message).toBe('To set "japan-cluster" as your follower cluster, first run "duper add-cluster"');
  });

  it('logs success when follower cluster does not change', async () => {
    getConfigurationFile.mockResolvedValue({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }], followerCluster: 'us-cluster' });

    await handler({ name: 'us-cluster' });

    expect(logSuccess).toHaveBeenCalledTimes(1);
    expect(logSuccess.mock.calls[0][0].message).toBe('Follower cluster is already "us-cluster"');
  });

  it('writes new follower cluster', async () => {
    writeConfigurationFile.mockResolvedValue({});
    getConfigurationFile.mockResolvedValue({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }, { name: 'japan-cluster', options: { node: { url: 'http://localhost:8200' } } }], followerCluster: 'us-cluster' });

    await handler({ name: 'japan-cluster' });

    expect(writeConfigurationFile).toHaveBeenCalledTimes(1);
    expect(writeConfigurationFile.mock.calls[0][0].config).toEqual({
      clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }, { name: 'japan-cluster', options: { node: { url: 'http://localhost:8200' } } }], followerCluster: 'japan-cluster'
    });
    expect(logSuccess).toHaveBeenCalledTimes(1);
    expect(logSuccess.mock.calls[0][0].message).toBe('Successfully set your follower cluster to "japan-cluster"');
  });

  it('logs failure', async () => {
    writeConfigurationFile.mockRejectedValue(new Error('write error'));
    getConfigurationFile.mockResolvedValue({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }, { name: 'japan-cluster', options: { node: { url: 'http://localhost:8200' } } }], followerCluster: 'us-cluster' });

    await handler({ name: 'japan-cluster' });

    expect(logFailure).toHaveBeenCalledTimes(1);
    expect(logFailure.mock.calls[0][0].error).toBe('Error writing duper configuration');
  });

});
