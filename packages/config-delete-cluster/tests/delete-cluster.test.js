const { handler } = require('../handler');
const {
  getConfigurationFile,
  writeConfigurationFile,
  logSuccess,
  logFailure,
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

describe('delete-cluster', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs failure when cluster does not exist', async () => {
    getConfigurationFile.mockResolvedValue({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }] });

    await handler({ name: 'japan-cluster' });

    expect(logFailure).toHaveBeenCalledTimes(1);
    expect(logFailure.mock.calls[0][0].error).toBe('Cluster named "japan-cluster" does not exist');
  });

  it('deletes follower cluster', async () => {
    writeConfigurationFile.mockResolvedValue({});
    getConfigurationFile.mockResolvedValue({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }], followerCluster: 'us-cluster' });

    await handler({ name: 'us-cluster' });

    expect(writeConfigurationFile).toHaveBeenCalledTimes(1);
    expect(writeConfigurationFile.mock.calls[0][0].config).toEqual({
      clusters: []
    });
    expect(logSuccess).toHaveBeenCalledTimes(1);
    expect(logSuccess.mock.calls[0][0].message).toBe('Successfully deleted cluster named "us-cluster"');
  });

  it('deletes leader cluster', async () => {
    writeConfigurationFile.mockResolvedValue({});
    getConfigurationFile.mockResolvedValue({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }, { name: 'japan-cluster', options: { node: { url: 'http://localhost:8200' } } }], leaderCluster: 'us-cluster' });

    await handler({ name: 'us-cluster' });

    expect(writeConfigurationFile).toHaveBeenCalledTimes(1);
    expect(writeConfigurationFile.mock.calls[0][0].config).toEqual({
      clusters: [{ name: 'japan-cluster', options: { node: { url: 'http://localhost:8200' } } }]
    });
    expect(logSuccess).toHaveBeenCalledTimes(1);
    expect(logSuccess.mock.calls[0][0].message).toBe('Successfully deleted cluster named "us-cluster"');
  });

  it('logs failure', async () => {
    writeConfigurationFile.mockRejectedValue(new Error('write error'));
    getConfigurationFile.mockResolvedValue({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }, { name: 'japan-cluster', options: { node: { url: 'http://localhost:8200' } } }], leaderCluster: 'us-cluster' });

    await handler({ name: 'us-cluster' });

    expect(logFailure).toHaveBeenCalledTimes(1);
    expect(logFailure.mock.calls[0][0].error).toBe('Error writing duper configuration');
  });
});

