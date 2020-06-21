const { handler } = require('../handler');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESSuccess,
  logESFailure,
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

getLeaderCluster.mockResolvedValue({ url: 'http://localhost:8200', name: 'us-cluster' });

describe('connect', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs success', async () => {
    const getSettingsMock = jest.fn().mockResolvedValue({ body: {
      persistent: {
        cluster: {
          remote: {
            'canada-cluster': { seeds: ['http://localhost:7777'] }
          }
        }
      }
    }});

    const putSettingsMock = jest.fn().mockResolvedValue({ body: {
      acknowledged: true
    }});

    const client = {
      cluster: {
        getSettings: getSettingsMock,
        putSettings: putSettingsMock,
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });


    await handler({ seeds: ['http://localhost:9300'], verbose: true });

    expect(getSettingsMock).toHaveBeenCalledTimes(1);
    expect(putSettingsMock).toHaveBeenCalledTimes(1);

    expect(putSettingsMock.mock.calls[0][0]).toEqual({
      body: {
        persistent: {
          cluster: {
            remote: {
              'canada-cluster': { seeds: ['http://localhost:7777'] },
              'us-cluster': { seeds: ['http://localhost:9300'] },
            }
          }
        }
      }
    });

    expect(logESSuccess.mock.calls[0][0]).toEqual({
      message: 'Successfully connected leader cluster "us-cluster" to your follower cluster',
      response: {
        acknowledged : true,
      },
      verbose: true
    });
  });

  it('logs failure', async () => {
    const getSettingsMock = jest.fn().mockResolvedValue({ body: {
      persistent: {
        cluster: {
          remote: {
            'canada-cluster': { seeds: ['http://localhost:7777'] }
          }
        }
      }
    }});

    const client = {
      cluster: {
        getSettings: getSettingsMock,
        putSettings: jest.fn().mockRejectedValue(new Error('Connect Error')),
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ follower_index: 'products-copy', leader_index: 'products', verbose: true, ignoreUnavailable: true });

    expect(logESFailure).toHaveBeenCalledTimes(1);
    expect(logESFailure.mock.calls[0][0].error.message).toBe('Connect Error');
  });
});
