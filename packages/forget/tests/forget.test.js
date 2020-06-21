const { handler } = require('../handler');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESSuccess,
  logESFailure,
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

describe('close', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs success', async () => {
    const getSettingsMock = jest.fn().mockResolvedValue({ body: {
      'products-copy': {
        settings: {
          index: { 
            uuid: '12345-67890-09876-54321'
          }
        }
      }
    }});

    const forgetFollowerMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
    }});



    const followerClient = {
      indices: {
        getSettings: getSettingsMock,
      },
    };
    const leaderClient = {
      ccr: {
        forgetFollower: forgetFollowerMock,
      },
    };

    getLeaderCluster.mockResolvedValue({ client: leaderClient, name: 'us-cluster' });
    getFollowerCluster.mockResolvedValue({ client: followerClient, name: 'japan-cluster' });

    await handler({ leader_index: 'products', follower_index: 'products-copy', verbose: true });

    expect(getSettingsMock).toHaveBeenCalledTimes(1);
    expect(forgetFollowerMock).toHaveBeenCalledTimes(1);

    expect(getSettingsMock.mock.calls[0][0]).toEqual({
      index: 'products-copy',
      name: 'index.uuid',
    });

    expect(forgetFollowerMock.mock.calls[0][0]).toEqual({
      index: 'products',
      body: {
        follower_cluster: 'japan-cluster',
        leader_remote_cluster: 'us-cluster',
        follower_index: 'products-copy',
        follower_index_uuid: '12345-67890-09876-54321'
      }
    });

    expect(logESSuccess.mock.calls[0][0]).toEqual({
      message: 'Successfully forgot "products" on "us-cluster"',
      response: {
        acknowledged : true,
      },
      verbose: true
    });
  });

  it('logs failure', async () => {
    const getSettingsMock = jest.fn().mockResolvedValue({ body: {
      'products-copy': {
        settings: {
          index: { 
            uuid: '12345-67890-09876-54321'
          }
        }
      }
    }});

    const forgetFollowerMock = jest.fn().mockRejectedValue(new Error('Forget Error'));

    const followerClient = {
      indices: {
        getSettings: getSettingsMock,
      },
    };
    const leaderClient = {
      ccr: {
        forgetFollower: forgetFollowerMock,
      },
    };
    getLeaderCluster.mockResolvedValue({ client: leaderClient, name: 'us-cluster' });
    getFollowerCluster.mockResolvedValue({ client: followerClient, name: 'japan-cluster' });

    await handler({ leader_index: 'products', follower_index: 'products-copy', verbose: true });

    expect(logESFailure).toHaveBeenCalledTimes(1);

    expect(logESFailure.mock.calls[0][0].error.message).toBe('Forget Error');
  });
});

