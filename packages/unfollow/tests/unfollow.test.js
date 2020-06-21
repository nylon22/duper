const { handler } = require('../handler');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESFailure,
  logESSuccess,
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

getLeaderCluster.mockResolvedValue({ url: 'http://localhost:8200', name: 'us-cluster' });

describe('unfollow', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs success', async () => {
    const unfollowMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
    }});

    const client = {
      ccr: {
        unfollow: unfollowMock,
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ follower_index: 'products-copy', verbose: true });

    expect(unfollowMock).toHaveBeenCalledTimes(1);
    expect(unfollowMock.mock.calls[0][0]).toEqual({
      index: 'products-copy',
    });

    expect(logESSuccess.mock.calls[0][0]).toEqual({
      message: 'Successfully unfollowed the leader index that "products-copy" was following',
      response: {
        acknowledged : true,
      },
      verbose: true
    });
  });

  it('logs failure', async () => {
    const client = {
      ccr: {
        unfollow: jest.fn().mockRejectedValue(new Error('Unfollow Error')),
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ follower_index: 'products-copy'});

    expect(logESFailure).toHaveBeenCalledTimes(1);

    expect(logESFailure.mock.calls[0][0].error.message).toBe('Unfollow Error');
  });
});
