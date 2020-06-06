const { Client } = require('@elastic/elasticsearch');
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
getFollowerCluster.mockResolvedValue({ url: 'http://localhost:9200', name: 'japan-cluster' });

describe('unfollow', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    Client.mockClear();
  });

  it('logs success', async () => {
    const unfollowMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
    }});

    Client.mockImplementation(() => {
      return {
        ccr: {
          unfollow: unfollowMock,
        }
      };
    });

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
    Client.mockImplementation(() => {
      return {
        ccr: {
          unfollow: jest.fn().mockRejectedValue(new Error('Unfollow Error')),
        }
      };
    });

    await handler({ follower_index: 'products-copy'});

    expect(logESFailure).toHaveBeenCalledTimes(1);

    expect(logESFailure.mock.calls[0][0].error.message).toBe('Unfollow Error');
  });
});
