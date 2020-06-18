const { handler } = require('../handler');
const {
  getConfigurationFile,
  writeConfigurationFile,
  logSuccess,
  logFailure,
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

describe('set-leader-cluster', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs failure when cluster does not exist', async () => {
    getConfigurationFile.mockResolvedValue({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }] });

    await handler({ name: 'japan-cluster' });

    expect(logFailure).toHaveBeenCalledTimes(1);
    expect(logFailure.mock.calls[0][0].error).toBe('Cluster named "japan-cluster" does not exist');
    expect(logFailure.mock.calls[0][0].message).toBe('To set "japan-cluster" as your leader cluster, first run "duper add-cluster"');
  });

  it('logs success when leader cluster does not change', async () => {
    getConfigurationFile.mockResolvedValue({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }], leaderCluster: 'us-cluster' });

    await handler({ name: 'us-cluster' });

    expect(logSuccess).toHaveBeenCalledTimes(1);
    expect(logSuccess.mock.calls[0][0].message).toBe('Leader cluster is already "us-cluster"');
  });

  it('writes new leader cluster', async () => {
    writeConfigurationFile.mockResolvedValue({});
    getConfigurationFile.mockResolvedValue({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }, { name: 'japan-cluster', options: { node: { url: 'http://localhost:8200' } } }], leaderCluster: 'us-cluster' });

    await handler({ name: 'japan-cluster' });

    expect(writeConfigurationFile).toHaveBeenCalledTimes(1);
    expect(writeConfigurationFile.mock.calls[0][0].config).toEqual({
      clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }, { name: 'japan-cluster', options: { node: { url: 'http://localhost:8200' } } }], leaderCluster: 'japan-cluster'
    });
    expect(logSuccess).toHaveBeenCalledTimes(1);
    expect(logSuccess.mock.calls[0][0].message).toBe('Successfully set your leader cluster to "japan-cluster"');
  });

  it('logs failure', async () => {
    getConfigurationFile.mockResolvedValue({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }, { name: 'japan-cluster', options: { node: { url: 'http://localhost:8200' } } }], leaderCluster: 'us-cluster' });
    writeConfigurationFile.mockRejectedValue(new Error('write failure'));

    await handler({ name: 'japan-cluster' });

    expect(logFailure).toHaveBeenCalledTimes(1);
    expect(logFailure.mock.calls[0][0].error).toBe('Error writing duper configuration');
  });
});
