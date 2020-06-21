const { handler } = require('../handler');
const {
  getFollowerCluster,
  getLeaderCluster,
  getValidatedArguments,
  logESSuccess,
  logESFailure,
} = require('@duper/utils');

jest.mock('@duper/utils');
jest.mock('@elastic/elasticsearch');

getLeaderCluster.mockResolvedValue({ url: 'http://localhost:8200', name: 'us-cluster' });
getFollowerCluster.mockResolvedValue({ url: 'http://localhost:9200', name: 'japan-cluster' });
getValidatedArguments.mockReturnValue({ max_write_buffer_count: 10 });

describe('resume', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs success', async () => {
    const resumeFollowMock = jest.fn().mockResolvedValue({ body: {
      acknowledged : true,
    }});

    const client = {
      ccr: {
        resumeFollow: resumeFollowMock,
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ follower_index: 'products-copy', verbose: true, max_write_buffer_count: 10 });

    expect(resumeFollowMock).toHaveBeenCalledTimes(1);
    expect(logESSuccess).toHaveBeenCalledTimes(1);

    expect(resumeFollowMock.mock.calls[0][0]).toEqual({
      index: 'products-copy',
      body: { max_write_buffer_count: 10 },
    });

    expect(logESSuccess.mock.calls[0][0]).toEqual({
      message: 'Successfully resumed following from "products-copy"',
      response: {
        acknowledged : true,
      },
      verbose: true
    });
  });

  it('logs failure', async () => {
    const client = {
      ccr: {
        resumeFollow: jest.fn().mockRejectedValue(new Error('Resume Error')),
      }
    };
    getFollowerCluster.mockResolvedValue({ client, name: 'japan-cluster' });

    await handler({ follower_index: 'products', verbose: true });

    expect(logESFailure).toHaveBeenCalledTimes(1);

    expect(logESFailure.mock.calls[0][0].error.message).toBe('Resume Error');
  });
});
