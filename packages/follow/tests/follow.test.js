const { handler } = require('../handler');
const {
  getFollowerCluster,
  getLeaderCluster,
  logESSuccess,
  logESFailure,
  getValidatedArguments,
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

getLeaderCluster.mockResolvedValue({ url: 'http://localhost:8200', name: 'us-cluster' });
getValidatedArguments.mockReturnValue({ leader_index: 'products', max_read_request_size: '10m' });


describe('follow', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs success', async () => {
    const followMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
    }});

    const client = {
      ccr: {
        follow: followMock,
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ follower_index: 'products-copy', leader_index: 'products', wait_for_active_shards: true, verbose: true, max_read_request_size: '10m' });

    expect(followMock).toHaveBeenCalledTimes(1);
    expect(logESSuccess).toHaveBeenCalledTimes(1);

    expect(followMock.mock.calls[0][0]).toEqual({
      index: 'products-copy',
      wait_for_active_shards: true,
      body: {
        remote_cluster: 'us-cluster',
        max_read_request_size: '10m',
        leader_index: 'products',
      }
    });

    expect(logESSuccess.mock.calls[0][0]).toEqual({
      message: 'Successfully followed "products" from "products-copy"',
      response: {
        acknowledged : true,
      },
      verbose: true
    });
  });

  it('logs failure', async () => {
    const client = {
      ccr: {
        follow: jest.fn().mockRejectedValue(new Error('Follow Error')),
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ follower_index: 'products-copy', leader_index: 'products', wait_for_active_shards: true, verbose: true, max_read_request_size: '10m' });

    expect(logESFailure).toHaveBeenCalledTimes(1);

    expect(logESFailure.mock.calls[0][0].error.message).toBe('Follow Error');
  });
});
