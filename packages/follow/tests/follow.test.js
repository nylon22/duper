const { Client } = require('@elastic/elasticsearch');
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
getFollowerCluster.mockResolvedValue({ url: 'http://localhost:9200', name: 'japan-cluster' });
getValidatedArguments.mockReturnValue({ leader_index: 'products', max_read_request_size: '10m' });


describe('follow', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    Client.mockClear();
  });

  it('logs success', async () => {
    const followMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
    }});

    Client.mockImplementation(() => {
      return {
        ccr: {
          follow: followMock,
        }
      };
    });

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
    Client.mockImplementation(() => {
      return {
        ccr: {
          follow: jest.fn().mockRejectedValue(new Error('Follow Error')),
        }
      };
    });

    await handler({ follower_index: 'products-copy', leader_index: 'products', wait_for_active_shards: true, verbose: true, max_read_request_size: '10m' });

    expect(logESFailure).toHaveBeenCalledTimes(1);

    expect(logESFailure.mock.calls[0][0].error.message).toBe('Follow Error');
  });
});


