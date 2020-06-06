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
getValidatedArguments.mockReturnValue({ ignoreUnavailable: true });

describe('open', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    Client.mockClear();
  });

  it('throws for missing follower_index and leader_index', async () => {
    const failHandler = async function() {
      await handler({});
    };
    expect(failHandler()).rejects.toEqual(new Error('Expected at least one of: "follower_index" "leader_index"'));
  });

  it('logs success', async () => {
    const openMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
      shards_acknowledged: true
    }});

    Client.mockImplementation(() => {
      return {
        indices: {
          open: openMock,
        }
      };
    });

    await handler({ follower_index: 'products-copy', leader_index: 'products', verbose: true, ignoreUnavailable: true });

    expect(openMock).toHaveBeenCalledTimes(2);
    expect(logESSuccess).toHaveBeenCalledTimes(2);

    expect(openMock.mock.calls[0][0]).toEqual({
      index: 'products-copy',
      ignoreUnavailable: true,
    });

    expect(openMock.mock.calls[1][0]).toEqual({
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
    Client.mockImplementation(() => {
      return {
        indices: {
          open: jest.fn().mockRejectedValue(new Error('Open Error')),
        }
      };
    });

    await handler({ follower_index: 'products-copy', leader_index: 'products', verbose: true, ignoreUnavailable: true });

    expect(logESFailure).toHaveBeenCalledTimes(2);

    expect(logESFailure.mock.calls[0][0].error.message).toBe('Open Error');

    expect(logESFailure.mock.calls[1][0].error.message).toBe('Open Error');
  });
});
