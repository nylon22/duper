const { handler } = require('../handler');
const {
  getFollowerCluster,
  logESSuccess,
  logESFailure,
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

describe('pause', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs success', async () => {
    const pauseFollowMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
    }});

    const client = {
      ccr: {
        pauseFollow: pauseFollowMock,
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ follower_index: 'products-copy', verbose: true });

    expect(pauseFollowMock).toHaveBeenCalledTimes(1);
    expect(logESSuccess).toHaveBeenCalledTimes(1);

    expect(pauseFollowMock.mock.calls[0][0]).toEqual({
      index: 'products-copy',
    });

    expect(logESSuccess.mock.calls[0][0]).toEqual({
      message: 'Successfully paused follower index "products-copy" on "japan-cluster"',
      response: {
        acknowledged : true,
      },
      verbose: true
    });
  });

  it('logs failure', async () => {
    const client = {
      ccr: {
        pauseFollow: jest.fn().mockRejectedValue(new Error('Pause Error')),
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ auto_follow_pattern_name: 'products', verbose: true });

    expect(logESFailure).toHaveBeenCalledTimes(1);

    expect(logESFailure.mock.calls[0][0].error.message).toBe('Pause Error');
  });
});

