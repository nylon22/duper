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

getValidatedArguments.mockReturnValue({ ignoreUnavailable: true });

describe('open', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('throws for missing follower_index and leader_index', async () => {
    const failHandler = async function() {
      await handler({});
    };
    expect(failHandler()).rejects.toEqual(new Error('Expected at least one of: "follower_index" "leader_index"'));
  });

  it('logs success', async () => {
    const followerOpenMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
      shards_acknowledged: true
    }});

    const leaderOpenMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
      shards_acknowledged: true
    }});

    const followerClient = {
      indices: {
        open: followerOpenMock,
      }
    };

    const leaderClient = {
      indices: {
        open: leaderOpenMock,
      }
    };
    getLeaderCluster.mockResolvedValue({ client: leaderClient, name: 'us-cluster' });
    getFollowerCluster.mockResolvedValue({ client: followerClient, name: 'japan-cluster' });

    await handler({ follower_index: 'products-copy', leader_index: 'products', verbose: true, ignoreUnavailable: true });

    expect(followerOpenMock).toHaveBeenCalledTimes(1);
    expect(leaderOpenMock).toHaveBeenCalledTimes(1);
    expect(logESSuccess).toHaveBeenCalledTimes(2);

    expect(followerOpenMock.mock.calls[0][0]).toEqual({
      index: 'products-copy',
      ignoreUnavailable: true,
    });

    expect(leaderOpenMock.mock.calls[0][0]).toEqual({
      index: 'products',
      ignoreUnavailable: true,
    });

    expect(logESSuccess.mock.calls[0][0]).toEqual({
      message: 'Successfully opened "products-copy" on "japan-cluster" cluster',
      response: {
        acknowledged : true,
        shards_acknowledged: true
      },
      verbose: true
    });

    expect(logESSuccess.mock.calls[1][0]).toEqual({
      message: 'Successfully opened "products" on "us-cluster" cluster',
      response: {
        acknowledged : true,
        shards_acknowledged: true
      },
      verbose: true
    });
  });

  it('logs failure', async () => {
    const followerClient = {
      indices: {
        open: jest.fn().mockRejectedValue(new Error('Open Error')),
      }
    };
    const leaderClient = {
      indices: {
        open: jest.fn().mockRejectedValue(new Error('Open Error')),
      }
    };
    getLeaderCluster.mockResolvedValue({ client: leaderClient, name: 'us-cluster' });
    getFollowerCluster.mockResolvedValue({ client: followerClient, name: 'japan-cluster' });

    await handler({ follower_index: 'products-copy', leader_index: 'products', verbose: true, ignoreUnavailable: true });

    expect(logESFailure).toHaveBeenCalledTimes(2);

    expect(logESFailure.mock.calls[0][0].error.message).toBe('Open Error');

    expect(logESFailure.mock.calls[1][0].error.message).toBe('Open Error');
  });
});
