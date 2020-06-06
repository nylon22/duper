const { Client } = require('@elastic/elasticsearch');
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
getFollowerCluster.mockResolvedValue({ url: 'http://localhost:9200', name: 'japan-cluster' });

describe('pause-auto-follow', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    Client.mockClear();
  });

  it('logs success', async () => {
    const pauseAutoFollowMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
    }});

    Client.mockImplementation(() => {
      return {
        ccr: {
          pauseAutoFollowPattern: pauseAutoFollowMock,
        }
      };
    });

    await handler({ auto_follow_pattern_name: 'products', verbose: true });

    expect(pauseAutoFollowMock).toHaveBeenCalledTimes(1);
    expect(logESSuccess).toHaveBeenCalledTimes(1);

    expect(pauseAutoFollowMock.mock.calls[0][0]).toEqual({
      name: 'products',
    });

    expect(logESSuccess.mock.calls[0][0]).toEqual({
      message: 'Successfully paused auto-following patterns matching "products" created on "us-cluster"',
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
          pauseAutoFollowPattern: jest.fn().mockRejectedValue(new Error('Pause Auto Follow Error')),
        }
      };
    });

    await handler({ auto_follow_pattern_name: 'products', verbose: true });

    expect(logESFailure).toHaveBeenCalledTimes(1);

    expect(logESFailure.mock.calls[0][0].error.message).toBe('Pause Auto Follow Error');
  });
});
