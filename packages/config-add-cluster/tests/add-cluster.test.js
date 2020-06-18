const { handler } = require('../handler');
const {
  getConfigurationFile,
  writeConfigurationFile,
  logSuccess,
  logFailure,
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

describe('add-cluster', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs failure when cluster already exists and overwrite is false', async () => {
    getConfigurationFile.mockResolvedValue({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }] });

    await handler({ url: 'http://localhost:9200', name: 'us-cluster' });

    expect(logFailure).toHaveBeenCalledTimes(1);
    expect(logFailure.mock.calls[0][0].error).toBe('A cluster named "us-cluster" already exists.');
    expect(logFailure.mock.calls[0][0].message).toBe('If you meant to overwrite it, include the --overwrite option');
  });

  it('writes configuration file', async () => {
    writeConfigurationFile.mockResolvedValue({});

    getConfigurationFile.mockResolvedValue({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }] });

    await handler({ url: 'http://localhost:9200', name: 'us-cluster', role: 'leader', sslKey: 'key', sslCert: 'cert', sslCa: 'ca', username: 'username', password: 'password', apiKey: 'apiKey', cloudId: 'cloudId', overwrite: true, verbose: false  });

    expect(writeConfigurationFile).toHaveBeenCalledTimes(1);
    expect(writeConfigurationFile.mock.calls[0][0].config).toEqual({
      clusters: [
        {
          name: 'us-cluster',
          options: 
        {
          node: {
            url: 'http://localhost:9200',
            ssl: {
              key: 'key',
              cert: 'cert', 
              ca: 'ca',
            },
          },
          auth: {
            username: 'username',
            password: 'password',
            apiKey: 'apiKey',
          },
          cloud: {
            id: 'cloudId',
          }
        }
        }
      ],
      leaderCluster: 'us-cluster',
    });

    expect(logSuccess).toHaveBeenCalledTimes(1);
    expect(logSuccess.mock.calls[0][0].message).toBe('Successfully added "us-cluster" to cluster configurations');
    expect(logSuccess.mock.calls[0][0].verboseMessage).toBe('Run "duper config list" to see the clusters in your duper configuration.');
    expect(logSuccess.mock.calls[0][0].verbose).toBe(false);
  });

  it('logs failure', async () => {
    getConfigurationFile.mockResolvedValue({ clusters: [{ name: 'us-cluster', options: { node: { url: 'http://localhost:9200' } } }] });
    writeConfigurationFile.mockRejectedValue(new Error('write failure'));

    await handler({ url: 'http://localhost:9200', name: 'us-cluster', role: 'leader', sslKey: 'key', sslCert: 'cert', sslCa: 'ca', username: 'username', password: 'password', apiKey: 'apiKey', cloudId: 'cloudId', overwrite: true, verbose: false  });

    expect(logFailure).toHaveBeenCalledTimes(1);
    expect(logFailure.mock.calls[0][0].error).toBe('Error writing duper configuration');
  });
});

